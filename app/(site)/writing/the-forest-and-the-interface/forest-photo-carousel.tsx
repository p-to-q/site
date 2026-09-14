'use client'

import { useState, useRef, useEffect, type KeyboardEvent } from 'react'
import Image from 'next/image'

interface Photo {
  filename: string
  caption?: string
  date?: string
  frameLabel: string // 照片右下角的简短标记
  description?: string // 底部的详细描述
}

const photos: Photo[] = [
  {
    filename: '270181781107623_.jpg',
    date: '2023-09-01',
    frameLabel: '#01 Hometown',
    description: 'Dongkou County, Shaoyang, Hunan Province — my hometown'
  },
  {
    filename: '270201781107628_.jpg',
    date: '2024-07-24',
    frameLabel: '#02 Urwald',
    description: "Neuenburger Urwald, Lower Saxony — one of Germany's oldest primeval forests"
  },
  {
    filename: '270281781107648_.jpg',
    date: '2024-07-25',
    frameLabel: '#03 Decay...',
    description: 'New growth and ancient decay, side by side. Some trees rot underground while the forest keeps renewing'
  },
  {
    filename: '270311781107660_.jpg',
    date: '2023-11-10',
    frameLabel: '#04 Gongqing',
    description: 'Gongqing Forest Park, Yangpu District, Shanghai'
  },
  {
    filename: '270241781107637_.jpg',
    date: '2024-04-09',
    frameLabel: '#05 South France',
    description: 'South of France'
  },
  {
    filename: '270221781107631_.jpg',
    date: '2024-07-18',
    frameLabel: '#06 Rome',
    description: 'Moonlight shadow'
  },
  {
    filename: '270271781107643_.jpg',
    date: '2024-04-11',
    frameLabel: '#07 Random',
    description: "Met during backpacking — can't recall when"
  },
  {
    filename: '270231781107633_.jpg',
    date: '2024-07-04',
    frameLabel: '#08 Bus',
    description: 'Found this abandoned bus in the woods, somewhere on the road'
  },
  {
    filename: '270191781107625_.jpg',
    date: '2025-02-11',
    frameLabel: '#09 Olympic',
    description: 'Near Olympic Forest Park, between 4th & 5th Ring Road. Not sure if it survived the 19XX disaster'
  },
  {
    filename: '270251781107639_.jpg',
    date: '2024-02-26',
    frameLabel: '#10 Train...!',
    description: 'Through train window...!'
  },
  {
    filename: '270261781107641_.jpg',
    date: '2024-03-29',
    frameLabel: '#11 Louisenlund',
    description: 'By the inland sea, next to Stiftung Louisenlund'
  },
  {
    filename: '270301781107659_.jpg',
    date: '2024-05-20',
    frameLabel: '#12 School',
    description: 'Stiftung Louisenlund'
  },
  {
    filename: '270291781107653_.jpg',
    date: '2024-06-15',
    frameLabel: '#13 Sea',
    description: 'an dem Meer'
  },
  {
    filename: '270211781107630_crop.jpg',
    date: '2024-07-24',
    frameLabel: '#14 Buttress roots!',
    description: 'Only saw these in textbooks before!'
  },
]

export function ForestPhotoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const sprocketTrackRef = useRef<HTMLDivElement>(null)
  const lastPhotoIndex = photos.length - 1

  // 胶片孔同步滚动
  useEffect(() => {
    const container = scrollContainerRef.current
    const sprocketTrack = sprocketTrackRef.current
    if (!container || !sprocketTrack) return

    const syncScroll = () => {
      sprocketTrack.scrollLeft = container.scrollLeft
    }

    container.addEventListener('scroll', syncScroll, { passive: true })
    return () => container.removeEventListener('scroll', syncScroll)
  }, [])

  useEffect(() => {
    const carousel = carouselRef.current
    const container = scrollContainerRef.current
    if (!carousel || !container) return

    const edgeTolerance = 3
    const playbackSpeed = 1.15

    const handleWheel = (e: WheelEvent) => {
      // Browser zoom and native horizontal gestures always keep their defaults.
      if (e.ctrlKey || e.metaKey || Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return

      const max = container.scrollWidth - container.clientWidth
      if (max <= edgeTolerance) return

      const current = container.scrollLeft
      const isScrollingDown = e.deltaY > 0
      const isScrollingUp = e.deltaY < 0
      const atStart = current <= edgeTolerance
      const atEnd = current >= max - edgeTolerance

      if ((isScrollingDown && atEnd) || (isScrollingUp && atStart)) {
        return
      }

      e.preventDefault()
      container.scrollLeft = Math.max(0, Math.min(max, current + e.deltaY * playbackSpeed))
    }

    // Scope wheel translation to the carousel itself. The page is never fixed,
    // and scrolling naturally returns to the article at either edge.
    carousel.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      carousel.removeEventListener('wheel', handleWheel)
    }
  }, [])

  // 滚动事件检测当前照片
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const items = Array.from(container.children) as HTMLElement[]
      const maxScrollLeft = container.scrollWidth - container.clientWidth
      const edgeTolerance = 2

      if (container.scrollLeft <= edgeTolerance) {
        setCurrentIndex(0)
        return
      }

      if (container.scrollLeft >= maxScrollLeft - edgeTolerance) {
        setCurrentIndex(photos.length - 1)
        return
      }

      const viewportCenter = container.scrollLeft + container.clientWidth / 2
      const newIndex = items.reduce((closestIndex, item, index) => {
        const closestItem = items[closestIndex]
        const itemCenter = item.offsetLeft + item.clientWidth / 2
        const closestCenter = closestItem.offsetLeft + closestItem.clientWidth / 2

        return Math.abs(itemCenter - viewportCenter) < Math.abs(closestCenter - viewportCenter)
          ? index
          : closestIndex
      }, 0)

      setCurrentIndex(Math.max(0, Math.min(photos.length - 1, newIndex)))
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setCurrentIndex((index) => Math.max(0, Math.min(lastPhotoIndex, index)))
  }, [lastPhotoIndex])

  const safeIndex = Math.max(0, Math.min(lastPhotoIndex, currentIndex))
  const currentPhoto = photos[safeIndex]

  const handleTrackKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    const container = scrollContainerRef.current
    if (!container) return

    event.preventDefault()
    const direction = event.key === 'ArrowRight' ? 1 : -1
    container.scrollBy({ left: direction * container.clientWidth * 0.85, behavior: 'auto' })
  }

  return (
    <div
      className="forest-photo-carousel"
      ref={carouselRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Forest photographs"
    >
      {/* 胶片孔轨道 - 跟随照片滚动 */}
      <div className="forest-photo-carousel__sprocket-container">
        <div
          ref={sprocketTrackRef}
          className="forest-photo-carousel__sprocket-track"
        >
          <div className="forest-photo-carousel__sprockets" />
        </div>
      </div>

      {/* 滚动容器 */}
      <div
        ref={scrollContainerRef}
        className="forest-photo-carousel__track"
        tabIndex={0}
        onKeyDown={handleTrackKeyDown}
        aria-label="Forest photographs. Use left and right arrow keys to browse."
      >
        {photos.map((photo, index) => (
          <div
            key={photo.filename}
            className="forest-photo-carousel__item"
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${photos.length}: ${photo.description ?? photo.frameLabel}`}
          >
            <Image
              src={`/resources/pictures/forest-interface/${photo.filename}`}
              alt={photo.description ?? photo.frameLabel}
              width={1800}
              height={815}
              className="forest-photo-carousel__image"
              priority={index === 0}
              sizes="(max-width: 639px) 300px, (max-width: 1199px) 400px, 440px"
              quality={85}
            />
            {/* 照片右下角帧标签 */}
            <div className="forest-photo-carousel__frame-label">
              {photo.frameLabel}
            </div>
          </div>
        ))}
      </div>

      {/* 底部信息：时间 + 详细描述 + 计数 */}
      <div className="forest-photo-carousel__caption" aria-live="polite" aria-atomic="true">
        <div className="forest-photo-carousel__left">
          <span className="forest-photo-carousel__date">
            {currentPhoto.date && new Date(currentPhoto.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              timeZone: 'UTC',
            })}
          </span>
        </div>
        {currentPhoto.description && (
          <div className="forest-photo-carousel__description">
            {currentPhoto.description}
          </div>
        )}
        <span className="forest-photo-carousel__counter">
          #{safeIndex + 1}/{photos.length}
        </span>
      </div>
    </div>
  )
}
