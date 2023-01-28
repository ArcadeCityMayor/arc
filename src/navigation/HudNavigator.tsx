import { Canvas } from '@react-three/fiber'
import { Realgame } from 'arca'
import { store } from 'arca/store'
import { PerspectiveCamera } from 'three'
import { Hud } from 'views/meta/Hud'

export const HudNavigator = () => {
  return (
    <>
      <Canvas
        onCreated={({ camera, gl, scene }) => {
          const realgame = new Realgame({
            camera: camera as PerspectiveCamera,
            renderer: gl,
            scene,
          })
          store.setState({ realgame })
        }}
      >
        <></>
      </Canvas>
      <Hud />
    </>
  )
}
