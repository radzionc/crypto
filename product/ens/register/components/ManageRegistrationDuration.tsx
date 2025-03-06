import { AmountInput } from '@lib/ui/inputs/Slider/AmountInput'
import { pluralize } from '@lib/utils/pluralize'

import { useRegistrationDuration } from '../state/registrationDuration'

export const ManageRegistrationDuration = () => {
  const [duration, setDuration] = useRegistrationDuration()

  return (
    <AmountInput
      label="Registration duration"
      value={duration}
      onChange={setDuration}
      min={1}
      max={10}
      step={1}
      formatValue={(value) => pluralize(value, 'year')}
    />
  )
}
