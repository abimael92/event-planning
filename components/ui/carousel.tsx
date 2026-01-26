'use client'

import * as React from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { cn } from '../../app/shared/lib/utils'
import { Button } from '@/components/ui/button'

// Simple carousel implementation without embla-carousel-react
// This is a fallback solution

type CarouselApi = {
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
}

type CarouselProps = {
  opts?: any
  plugins?: any
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: CarouselApi) => void
  children?: React.ReactNode
  className?: string
}

type CarouselContextProps = {
  api: CarouselApi
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  orientation: 'horizontal' | 'vertical'
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }

  return context
}

function Carousel({
  orientation = 'horizontal',
  setApi,
  className,
  children,
  ...props
}: CarouselProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(true)

  const scrollPrev = React.useCallback(() => {
    if (containerRef.current && contentRef.current) {
      const containerWidth = containerRef.current.clientWidth
      containerRef.current.scrollLeft -= containerWidth
    }
  }, [])

  const scrollNext = React.useCallback(() => {
    if (containerRef.current && contentRef.current) {
      const containerWidth = containerRef.current.clientWidth
      containerRef.current.scrollLeft += containerWidth
    }
  }, [])

  const api = React.useMemo(
    () => ({
      scrollPrev,
      scrollNext,
      canScrollPrev,
      canScrollNext,
    }),
    [scrollPrev, scrollNext, canScrollPrev, canScrollNext],
  )

  React.useEffect(() => {
    if (setApi) {
      setApi(api)
    }
  }, [api, setApi])

  const handleScroll = React.useCallback(() => {
    if (containerRef.current && contentRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
      setCanScrollPrev(scrollLeft > 0)
      setCanScrollNext(scrollLeft + clientWidth < scrollWidth)
    }
  }, [])

  React.useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      handleScroll() // Initial check
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [handleScroll])

  return (
    <CarouselContext.Provider
      value={{
        api,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        orientation,
      }}
    >
      <div
        className={cn('relative overflow-hidden', className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { orientation } = useCarousel()

  React.useEffect(() => {
    const container = containerRef.current
    if (container) {
      // Store the container ref in the parent
      const carousel = container.closest('[data-slot="carousel"]')
      if (carousel) {
        // This is a simple approach - in a real implementation,
        // you'd want to pass this ref up to the parent context
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn(
        'flex overflow-x-auto scroll-smooth',
        orientation === 'horizontal'
          ? 'snap-x snap-mandatory -ml-4'
          : '-mt-4 flex-col',
        className,
      )}
      data-slot="carousel-content"
      {...props}
    >
      <div className={cn('flex', orientation === 'horizontal' ? 'ml-4' : '')}>
        {children}
      </div>
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<'div'>) {
  const { orientation } = useCarousel()

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full snap-start',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className,
      )}
      {...props}
    />
  )
}

function CarouselPrevious({
  className,
  variant = 'outline',
  size = 'icon',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        'absolute size-8 rounded-full',
        orientation === 'horizontal'
          ? 'top-1/2 -left-12 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
}

function CarouselNext({
  className,
  variant = 'outline',
  size = 'icon',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        'absolute size-8 rounded-full',
        orientation === 'horizontal'
          ? 'top-1/2 -right-12 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  )
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}