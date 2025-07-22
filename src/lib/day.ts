import lib from "dayjs"
import dayjsRelative from "dayjs/plugin/relativeTime"
import "dayjs/locale/pt-BR"

lib.locale("pt-BR")
lib.extend(dayjsRelative)
export const dayjs = lib


