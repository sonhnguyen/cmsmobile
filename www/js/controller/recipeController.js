cms.controller('recipeController', ['$scope','$state','$ionicPopover','$ionicPopup',
  '$ionicLoading','$ionicModal','$ionicHistory',
  function ($scope,$state,$ionicPopover,$ionicPopup,$ionicLoading,$ionicModal,$ionicHistory) {

$scope.recipes = [
{title: 'Bánh Tiêu', content: 'I. Nguyên Liệu: -  Bột mỳ 500g; -  Men nở (loại men dùng để làm bánh mỳ) 6g; - Va ni 2 ống; - Mè trắng 150g; - Gia vị Muối, đường, dầu ăn và khoảng 220ml nước sôi 30 độ C; - Dụng cụ cán bột. II. Cách Làm 1. Sơ Chế Nguyên Liệu. - Hòa tan đường vào nước ấm (khoảng 80-100g đường tùy theo khẩu vị), đến khi đường tan hết tiếp tục cho men nở vào khuấy đều, để khoảng 10 phút đến khi men nổi lên trên mặt nước là được. - Trộn đều 500g  bột mỳ, 1 thìa muối vào một cái chậu lớn dùng để nhồi bột rồi cho hỗn hợp nước – đường – men hòa tan bên trên vào, dùng tay có thoa chút dầu ăn nhồi đến khi nào thấy bột mịn, bóng, không bị dính tay là được. Bạn có thể cho hỗn hợp nước – đường – men vào từ từ trong quá trình nhồi hay cho vào một lần đều được. - Sau đó, cho bột đã nhào vào một cái chậu lớn, dùng khăn ẩm bọc kín bên trên và ủ bột ở nơi kín gió khoảng 1 -2 tiếng, khi nào thấy bột nở gấp đôi là đạt yêu cầu. Dùng tay ấn nhẹ đều khắp khối bột cho bọt khí thoát hết ra và đổ vani vào bột nhào đều lên, vắt bột thành khối trụ tròn dài và dùng dao cắt thành 20-25 miếng bột đều nhau, vo tròn lại, lăn đều qua đĩa mè rang sẵn. - Mè trắng: Đãi sạch, rang cho hạt mè có màu vàng nhẹ và có mùi thơm đặc trưng; 2. Thực hiện làm món bánh tiêu - Dùng dụng cụ cán bột hay 1 cái chai thủy tinh tròn cán miếng bột đã lăn qua mè dẹp đều ra; - Sử dụng chảo chống dính, cho vào chảo một lượng dầu ăn vừa đủ sao cho ngập mặt bánh khi chiên để bánh được phồng đều đẹp, để lửa lớn đến khi dầu sôi nóng già, vặn lửa nhỏ lại, thả từng miếng bột đã cán vào; - Dùng đũa đè sát 2 mép bột để phần giữa phồng đều, rồi lật mặt bánh khi mặt này đã phồng lên, chiên vàng đều 2 mặt bánh, khi bánh đã chín, bạn vớt ra đĩa có giấy thấm dầu là đã có thể thưởng thức món bánh ấm nóng này.', like: 'Like'}
];

$ionicModal.fromTemplateUrl('view/addRecipePage.html', function(modal) {
    $scope.recipeModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

$scope.createRecipe = function(recipe) {
    $scope.recipes.push({
      title: recipe.title,
      content: recipe.content,
      like: 'Like'
    });
    $scope.recipeModal.hide();
    recipe.title = "";
    recipe.content = "";
  };

$scope.addRecipe = function()
{
  $scope.recipeModal.show();
}

$scope.backToRecipe = function()
{
	$scope.recipeModal.hide();
}

$scope.share= function()
{
	console.log("Share");
}

$scope.like = function(n)
{
	console.log("Like");
	if($scope.recipes[n]['like'] == 'Like')
		$scope.recipes[n]['like'] = 'Unlike';
	else
		$scope.recipes[n]['like'] = 'Like';
}



}]);
