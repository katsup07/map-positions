/// <reference types="@types/google.maps" />
export interface Mappable {
	location: {
		lat: number;
		lng: number;
	};
  markerContent(): string;
}

export class CustomMap {
	private googleMap: google.maps.Map;

	constructor(divId: string) {
		this.googleMap = new google.maps.Map(
			document.getElementById(divId) as HTMLElement,
			{
				backgroundColor: 'teal',
				zoom: 1,
				center: {
					lat: 0,
					lng: 0,
				},
			}
		);
	}

	// ! repetitive code that's not extensible without constantly adding a function for each marker
	// addUserMarker(user: User): void{
	//   new google.maps.Marker({map: this.googleMap, position: user.location});
	// }

	// addCompanyMarker(company: Company): void{
	//   new google.maps.Marker({map: this.googleMap, position: company.location});
	// }

	addMarker(mappable: Mappable) {
		const marker = new google.maps.Marker({ map: this.googleMap, position: mappable.location });
   
    // Popup Window
    const infoWindow = new google.maps.InfoWindow({ content: mappable.markerContent() });
    marker.addListener('click', () => { infoWindow.open(this.googleMap, marker); });
	}
}
