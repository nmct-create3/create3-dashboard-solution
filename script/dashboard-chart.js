let visitorRanges, graph, canvas, loaderContainer, loaderDelay, loader, chart

const _generateLabels = (amount) => {
  return new Array(amount)
    .fill()
    .map(
      (_, i) =>
        `${new Date(
          new Date().setDate(new Date().getDate() - i),
        ).toLocaleDateString()}`,
    )
    .reverse()
}

const _generateValues = (amount) => {
  return new Array(amount)
    .fill()
    .map(() => Math.floor(Math.random() * 1000))
    .reverse()
}

const sampleData = {
  day: {
    labels: [`${new Date().toLocaleDateString()}`],
    data: [Math.floor(Math.random() * 1000)],
  },
  week: {
    labels: _generateLabels(7),
    data: _generateValues(7),
  },
  month: {
    labels: _generateLabels(30),
    data: _generateValues(30),
  },
  year: {
    labels: _generateLabels(365),
    data: _generateValues(365),
  },
}

const hideLoader = function () {
  clearTimeout(loaderDelay)

  loaderContainer.style.display = 'none'
  canvas.style.display = 'block'
  loader.style.opacity = 0
}

const showLoader = function () {
  loaderContainer.style.display = 'flex'
  canvas.style.display = 'none'

  loaderDelay = setTimeout(() => {
    loader.style.opacity = 1
  }, 1000)
}

const drawChart = (range = 'day') => {
  let ctx = graph.getContext('2d')
  const { labels, data } = sampleData[range]

  Chart.defaults.defaultFontColor = '#808495'
  Chart.defaults.defaultFontFamily =
    "'Source Sans Pro', 'Helvetica', 'arial', 'sans-serif'"
  Chart.defaults.datasets.bar.maxBarThickness = 20

  if (chart) {
    chart.data.labels = labels
    chart.data.datasets[0].data = data
    chart.type = range === 'year' ? 'line' : 'bar'

    return chart.update()
  }

  chart = new Chart(ctx, {
    // new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Visitors',
          data,
          borderColor: '#A3A0FB',
          backgroundColor: '#A3A0FB',
          pointBackgroundColor: 'white',
          borderWidth: 0,
          pointRadius: 4,
          borderRadius: 4,
        },
      ],
    },
    options: {
      scales: {},
      tooltips: {
        xPadding: 10,
        yPadding: 10,
        cornerRadius: 0,
      },
      legend: {
        position: 'bottom',
        align: 'start',
        labels: {
          boxWidth: 2,
        },
      },
      responsive: true,
    },
  })

  // document.querySelector('.js-chartjsLegend').innerHTML = chart.generateLegend();
}

const getVisitorsBy = (range) => {
  showLoader()
  drawChart(range)
  hideLoader()
}

const init = () => {
  visitorRanges = document.querySelectorAll('.js-visitors-radio')
  graph = document.querySelector('.js-graph')

  Array.from(visitorRanges).map((range) =>
    range.addEventListener('change', function (e) {
      getVisitorsBy(e.target.value)
    }),
  )

  canvas = document.querySelector('.js-graph')
  loaderContainer = document.querySelector('.js-load-container')
  loader = document.querySelector('.js-loader')

  getVisitorsBy('day')
}

document.addEventListener('DOMContentLoaded', function () {
  init()
})
