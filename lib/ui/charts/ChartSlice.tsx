import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'

type ChartSliceProps = {
  yLabelsWidth: number | string
}

export const ChartSlice = styled.div<ChartSliceProps>`
  position: relative;
  display: grid;
  grid-template-columns: ${({ yLabelsWidth }) => toSizeUnit(yLabelsWidth)} 1fr;
`
