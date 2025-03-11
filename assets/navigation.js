import Delegate from 'ftdomdelegate';
import {
  listen,
  qs,
  qsa,
  add,
  remove,
  toggle,
  contains,
} from '@fluorescent/dom';

export default function Navigation(node) {
  if (!node) return;

  const parents = qsa('[data-parent]', node);

  if (!parents) return;

  const delegate = new Delegate(document.body);

  delegate.on('click', '*', e => handleClick(e));

  const events = [
    listen(parents, 'click', e => {
      e.preventDefault();

      toggleMenu(e.currentTarget.parentNode);
    }),

    listen(node, 'keydown', ({ keyCode }) => {
      if (keyCode === 27) closeAll();
    }),

    listen(qsa('.header__links-list > li > a', node), 'focus', e => {
      if (!userIsUsingKeyboard()) return;

      closeAll();
    }),

    listen(qsa('[data-link]', node), 'focus', e => {
      e.preventDefault();

      if (!userIsUsingKeyboard()) return;

      const link = e.currentTarget;

      if (link.hasAttribute('data-parent')) {
        toggleMenu(link.parentNode);
      }

      const siblings = qsa('[data-link]', link.parentNode.parentNode);
      siblings.forEach(el =>
        toggle(qsa('[data-submenu]', el.parentNode), 'active', el === link)
      );
    }),

    // Close everything when focus leaves the main menu
    listen(qsa('[data-link]', node), 'focusout', e => {
      if (!userIsUsingKeyboard()) return;

      if (e.relatedTarget && !e.relatedTarget.hasAttribute('data-link')) {
        closeAll();
      }
    }),

    // Listen to horizontal scroll to offset inner menus
    listen(node, 'scroll', () => {
      document.documentElement.style.setProperty(
        '--navigation-menu-offet',
        `${node.scrollLeft}px`
      );
    }),
  ];

  function userIsUsingKeyboard() {
    return contains(document.body, 'user-is-tabbing');
  }

  function toggleMenu(el) {
    const menu = qs('[data-submenu]', el);
    const menuTrigger = qs('[data-link]', el);

    if (!contains(menu, 'active')) {
      // Make sure all lvl 2 submenus are closed before opening another
      if (el.parentNode.dataset.depth === '1') {
        closeAll(el.parentNode);
      } else {
        closeAll();
      }

      menuTrigger.setAttribute('aria-expanded', true);
      menu.setAttribute('aria-hidden', false);
      add(menu, 'active');
    } else {
      // If the toggle is closing the element from the parent close all internal
      if (contains(el.parentNode, 'header__links-list')) {
        closeAll();
        return;
      }
      menuTrigger.setAttribute('aria-expanded', false);
      menu.setAttribute('aria-hidden', true);
      remove(menu, 'active');
    }
  }

  // We want to close the menu when anything is clicked that isn't a submenu
  function handleClick(e) {
    if (!e.target.closest('[data-submenu-parent]')) {
      closeAll();
    }
  }

  function closeAll(target = node) {
    const subMenus = qsa('[data-submenu]', target);
    const parentTriggers = qsa('[data-parent]', target);

    remove(subMenus, 'active');
    subMenus.forEach(sub => sub.setAttribute('aria-hidden', true));
    parentTriggers.forEach(trig => trig.setAttribute('aria-expanded', false));
  }

  function destroy() {
    delegate.off();
    events.forEach(evt => evt());
  }

  return { destroy };
}
