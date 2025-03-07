import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { InputLabel } from '@lib/ui/inputs/InputLabel'
import { Slider } from '@lib/ui/inputs/Slider'
import { pluralize } from '@lib/utils/pluralize'

import { useRegistrationDuration } from '../state/registrationDuration'

export const ManageRegistrationDuration = () => {
  const [duration, setDuration] = useRegistrationDuration()

  return (
    <InputContainer>
      <InputLabel>
        Registration duration: {pluralize(duration, 'year')}
      </InputLabel>
      <Slider
        value={duration}
        onChange={setDuration}
        min={1}
        max={10}
        step={1}
        size="l"
      />
    </InputContainer>
  )
}
