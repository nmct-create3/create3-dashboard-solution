const pastYears = 1,
  exportData = {},
  today = new Date()

const generateSomeRandomShit = (from, to) => {
  return Math.floor(Math.random() * (to - from)) + from
}

const generateMonthData = (monthDate) => {
  const month = {}
  for (let d = 1; d < monthDate.getDate() + 1; d++) {
    if (
      new Date(
        `${monthDate.getFullYear()}-${monthDate.getMonth() + 1}-${d}`,
      ).getDate() <= today.getDate()
    ) {
      month[`${monthDate.getFullYear()}-${monthDate.getMonth() + 1}-${d}`] =
        generateSomeRandomShit(100, 3000)
    }
  }
  return month
}

for (let y = 0; y < pastYears + 1; y++) {
  exportData[`${today.getFullYear() - y}`] = {}

  for (let m = 0; m < 12; m++) {
    const currentMonth = new Date(today.getFullYear() - 1, m + 1, 0)

    if (today.getFullYear() - y === today.getFullYear()) {
      if (currentMonth.getMonth() <= today.getMonth()) {
        exportData[`${today.getFullYear() - y}`][currentMonth.getMonth() + 1] =
          generateMonthData(currentMonth)
      }
    } else {
      exportData[`${today.getFullYear() - y}`][currentMonth.getMonth() + 1] =
        generateMonthData(currentMonth)
    }
  }
}

console.log(exportData)
