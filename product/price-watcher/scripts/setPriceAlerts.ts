import { deleteAllPriceAlerts, putPriceAlert } from '../db/priceAlerts'
import { PriceAlert } from '../entities/PriceAlert'

const rules: Omit<PriceAlert, 'id' | 'isNotified'>[] = [
  {
    asset: 'ethereum',
    targetPrice: 3800,
    condition: 'less',
  },
  {
    asset: 'ethereum',
    targetPrice: 4000,
    condition: 'more',
  },
]

const priceAlerts: PriceAlert[] = rules.map((rule, index) => ({
  ...rule,
  id: index.toString(),
  isNotified: false,
}))

const setPriceAlerts = async () => {
  await deleteAllPriceAlerts()

  await Promise.all(priceAlerts.map((alert) => putPriceAlert(alert)))
}

setPriceAlerts()
