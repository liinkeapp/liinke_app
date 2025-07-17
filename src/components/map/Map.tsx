'use client'

import React, { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN! // Store your token in .env

type MapProps = {
  markers?: { lat: number; lng: number; id?: string }[]
}

export default function Map({ markers = [] }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12', // or satellite-streets-v12
      center: [36.8219, -1.2921], // Default to Nairobi
      zoom: 12,
    })

    // Add zoom & rotate controls
    mapRef.current.addControl(new mapboxgl.NavigationControl())

    // Add user location tracking
    mapRef.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showAccuracyCircle: false,
      }),
    )

    // Add markers
    markers.forEach(({ lat, lng }) => {
      new mapboxgl.Marker().setLngLat([lng, lat]).addTo(mapRef.current!)
    })
  }, [markers])

  return <div ref={mapContainer} className="w-full h-[500px] rounded-xl shadow" />
}
