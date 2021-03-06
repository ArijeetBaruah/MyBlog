import React from 'react';
import { withStyles, withSounds } from 'arwes';
import history from '../history';

const isExtern = /^https?\:\/\//;

const Link = props => {
    const {
        theme,
        classes,
        context,
        sounds,
        href,
        target,
        children,
        onLink,
        onClick,
        ...etc
    } = props;

    const linkTrigger = (ev) => {
        ev.preventDefault();
        sounds.click && sounds.click.play();
        onClick && onClick(ev);

        if (href === 'javascript:void(0);') {
          return;
        }

        const { pathname, search } = window.location;
        if ((pathname + search === href) && href !== '/') {
          return;
        }
    
        if (!target) {
          onLink && onLink(ev);
        }
    
        setTimeout(() => {
          if (target) {
            window.open(href);
          }
          else if (isExtern.test(href)) {
            window.location.href = href;
          }
          else {
            window.location.href = href;
          }
        }, theme.animTime);
    };

    return (
        <a {...etc} href={href} target={target} onClick={linkTrigger}>
          {children}
        </a>
    );
};

export default withStyles(() => {})(
    withSounds()(Link)
);
