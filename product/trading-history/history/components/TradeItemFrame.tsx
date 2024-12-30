import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'

export const TradeItemFrame = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr 200px;
  align-items: center;
  gap: 20px;

  color: ${getColor('textSupporting')};

  & > :last-child {
    justify-self: end;
  }
`
