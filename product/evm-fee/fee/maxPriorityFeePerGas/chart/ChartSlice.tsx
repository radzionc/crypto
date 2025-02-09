import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { feeChartConfig } from './config'

export const ChartSlice = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: ${toSizeUnit(feeChartConfig.yLabelsWidth)} 1fr;
`
