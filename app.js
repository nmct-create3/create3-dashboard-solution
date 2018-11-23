let daySelect,
	graph;

const drawChart = ( data, labels ) => {
	let ctx = graph.getContext('2d');
	let chart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: labels,
			datasets: [{
				label: 'Visitors',
				data: data,
				borderColor: '#A3A0FB',
				lineTension: .3
				backgroundColor: '#A3A0FB',
				fill: false,
				borderWidth: 2,
				pointRadius: 4,
			}],
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
					}
				}]
			},
			legend: {
				// display: false,
				labels: {
					defaultFontFamily: Chart.defaults.global.defaultFontFamily = "'Source Sans Pro', 'Helvetica', 'arial', 'sans-serif'"
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
