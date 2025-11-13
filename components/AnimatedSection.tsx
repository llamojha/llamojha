
import React, { useState, useRef, useEffect, ReactNode, FC } from 'react';

// --- Custom Hook for Scroll Animations ---
const useOnScreen = <T extends Element,>(options: IntersectionObserverInit): [React.RefObject<T>, boolean] => {
  const ref = useRef<T>(null);
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true);
        if (ref.current) {
            observer.unobserve(ref.current);
        }
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isIntersecting];
};

// --- AnimatedSection Wrapper ---
interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
  id?: string;
}

export const AnimatedSection: FC<AnimatedSectionProps> = ({ children, className = '', stagger = false, id }) => {
  const [ref, isVisible] = useOnScreen<HTMLDivElement>({ threshold: 0.1 });
  const baseTransition = 'transition-all duration-1000 ease-out';

  return (
    <section 
      id={id}
      ref={ref} 
      className={`py-20 md:py-32 px-6 md:px-12 relative ${className} ${baseTransition} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="container mx-auto max-w-7xl">
        {React.Children.map(children, (child, index) => {
          if (stagger && React.isValidElement<{ className?: string; style?: React.CSSProperties }>(child)) {
            return React.cloneElement(child, {
              className: `${child.props.className || ''} ${baseTransition} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`,
              style: { transitionDelay: `${index * 150}ms`, ...child.props.style }
            });
          }
          return child;
        })}
      </div>
    </section>
  );
};
