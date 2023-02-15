import {Children, useLayoutEffect, useRef} from "react";

// дочерние елементы будут убегать от тебя
export const Tease = ({
  children
                     }) => {
  return Children.map(children, (child) => {
    return <RunAway>
      {child}
    </RunAway>
  });
}

const RunAway = ({
  children
            }) => {

  useLayoutEffect(() => {

    const onScroll = (e) => {
      ref.current.style.top = '0px'
      ref.current.style.left = '0px'
      setTimeout(() => {
        const rect = ref.current.getBoundingClientRect();

        ref.current.dataset.cachedTop = rect.top + '';
        ref.current.dataset.cachedLeft = rect.left + '';

      })
    }
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll);
  })

  const ref = useRef<null | HTMLDivElement>(null);
  return <div style={{
    position: 'relative'
  }} ref={ref} onMouseEnter={(e) => {
    const rect = ref.current.getBoundingClientRect();
    if(!ref.current.dataset.cachedTop) {
      ref.current.dataset.cachedTop = rect.top + '';
    }
    if(!ref.current.dataset.cachedLeft) {
      ref.current.dataset.cachedLeft = rect.left + '';
    }

    ref.current.dataset.entryX = (e.clientX - rect.left) + "";
    ref.current.dataset.entryY = (e.clientY - rect.top) + "";

  }} onMouseMove={(e) => {
    const clientX = e.clientX;
    const clientY = e.clientY;

    ref.current.style.top = clientY - +ref.current.dataset.cachedTop - +ref.current.dataset.entryY + 'px'
    ref.current.style.left = clientX - +ref.current.dataset.cachedLeft - +ref.current.dataset.entryX + 'px'
  }}>
    {children}
  </div>;
}
