import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { tradesChartConfig } from './config'

export const ChartSlice = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: ${toSizeUnit(tradesChartConfig.yLabelsWidth)} 1fr;
`
