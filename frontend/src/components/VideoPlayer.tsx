'use client'
import { useRef } from "react"
import { useEffect } from "react"

export default function VideoPlayer(
    {vdoSrc, isPlaying}: {vdoSrc: string, isPlaying: boolean}
) {
    const vdoRef = useRef<HTMLVideoElement>(null)

    useEffect(()=>{
        // alert('width is ' + vdoRef.current?.videoWidth)
        if(isPlaying) {
            // alert('play')
            vdoRef.current?.play()
        } else {
            // alert('pause')
            vdoRef.current?.pause()
        }
    }, [isPlaying])

    return (
        <video className="w-[40%]" src={vdoSrc} ref={vdoRef} muted loop controls/>
    )
}