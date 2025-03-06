import { CheckIcon } from '@lib/ui/icons/CheckIcon'
import { Spinner } from '@lib/ui/loaders/Spinner'
import styled from 'styled-components'

type MultiStepProgressListProps<T extends string = string> = {
  steps: readonly T[]
  currentStep: T
  getStepText: (step: T) => string
}

const StepsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const StepItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
`

const StepIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: currentColor;
`

const StepLabel = styled.span`
  font-weight: 500;
`

export const MultiStepProgressList = <T extends string = string>({
  steps,
  currentStep,
  getStepText,
}: MultiStepProgressListProps<T>) => {
  const currentStepIndex = steps.findIndex((step) => step === currentStep)

  return (
    <StepsList>
      {steps.map((step, index) => {
        const isCompleted = index < currentStepIndex
        const isCurrent = index === currentStepIndex

        return (
          <StepItem key={step}>
            <StepIcon>
              {isCompleted ? (
                <CheckIcon />
              ) : isCurrent ? (
                <Spinner />
              ) : (
                <div style={{ width: '1em', height: '1em' }} />
              )}
            </StepIcon>
            <StepLabel>{getStepText(step)}</StepLabel>
          </StepItem>
        )
      })}
    </StepsList>
  )
}
