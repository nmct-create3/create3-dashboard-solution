let daySelect,
	graph;

const drawChart = ( data, labels ) => {
	let ctx = graph.getContext('2d');
	let chart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"],
			datasets: [{
				label: 'Visitors',
				data: data,
				borderColor: '#A3A0FB',
				backgroundColor: '#A3A0FB10',
				pointBackgroundColor: 'white',
				//fill: false,
				lineTension: .3,
				borderWidth: 2,
				pointRadius: 4,
			}],
		},
		options: {
			defaultFontColor: Chart.defaults.global.defaultFontColor = '#808495',
			scales: {
				yAxes: [{
					ticks: {
					}
				}]
			},
			legend: {
				// display: false,
				position: 'bottom',
				labels: {
					defaultFontFamily: Chart.defaults.global.defaultFontFamily = "'Source Sans Pro', 'Helvetica', 'arial', 'sans-serif'",
					boxWidth: 15
					// usePointStyle: true
				}
			},
			responsive: true,
			// maintainAspectRatio: false,
		}
	});
	document.querySelector('.js-chartjsLegend').innerHTML = chart.generateLegend();
}

const getDataAndLabels = ( json ) => {
	let data = [],
		labels = [];

	json.map( day => {
		// console.log( day );
		labels.push( day.tijdstip );
		data.push( day.aantalBezoekers );
	});

	drawChart( data, labels );
}

const getVisitorsByDay = ( day ) => {
	let endpoint = `https://iotcloud-nmct.azurewebsites.net/api/visitors/${ day }`;

	fetch( endpoint )
		.then( r => r.json() )
		.then( json => {
			console.log( json );
			getDataAndLabels( json );
		})
		.catch( e => console.error( e ) )
}

const init = () => {
	daySelect = document.querySelector( '.js-day-select' ),
		graph = document.querySelector( '.js-graph' );

	daySelect.addEventListener( 'change', function( e ) {
		getVisitorsByDay( e.target.value );
	});

	getVisitorsByDay( 'maandag' );
}

document.addEventListener( 'DOMContentLoaded', function() {
	init();
});
