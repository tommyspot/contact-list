angular.module('myApp').controller('NavigationController', function ($scope, $location) {
	$scope.nav = {
		navItems: ['contacts', 'database'],
		selectedIndex: $location.path() == '/database' ? 1 : 0,
		navClick: function ($index) {
		$scope.nav.selectedIndex = $index;
		}
	};
});
