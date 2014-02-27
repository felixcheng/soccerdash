/// Directive to open modal
soccerDashApp.directive('modalDialog', function(){
	return {
		restrict: 'EA',
		scope: { 
			show: '='
		},
		replace: true,
		transclude: true,

		link: function(scope, iElement, iAttrs){
 			scope.dialog ={};
 			if (iAttrs.width){
 				scope.dialog.width = iAttrs.width;
 			}
 			if (iAttrs.height){
 				scope.dialog.height = iAttrs.height;
 			}
 			scope.hideModal = function(){
 				scope.show = false;
 			}
		},

	template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"

	}
});
