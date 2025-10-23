import { docs, almuerzos, hoteles } from "@/.source"
import { loader } from "fumadocs-core/source"

export const source: ReturnType<typeof loader> = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
})

export const almuerzosSource = loader({
  baseUrl: "/almuerzos/docs",
  source: almuerzos.toFumadocsSource(),
})

export const hotelesSource = loader({
  baseUrl: "/hoteles/docs",
  source: hoteles.toFumadocsSource(),
})