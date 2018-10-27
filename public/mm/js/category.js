// 当页面的DOM结构加载完成之后 执行回调函数中的代码
$(function () {

	// 初始化区域滚动组件
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});

	// 获取一级分类数据
	$.ajax({
		url: '/category/queryTopCategory',
		type: 'get',
		success: function (response) {

			// 所谓模板引擎 作用就是用来帮我们将数据和html拼接好 将拼接好的结果 返回给我们

			// 将数据和html做拼接
			// 1) html模板ID
			// 2) 数据
			// 3) 告诉模板引擎 html模板和数据怎样进行拼接
			var html = template('category-first', {
				result: response.rows
			});
			// console.log(html);
			$('.links').html(html);
			//如果一级分类为真
			if (response.rows.length) {
				//给第一条数据添加选中样式
				$('.links').find('a').eq(0).addClass('active')

				var id = response.rows[0].id;

				getSecondCategory(id);

			}
		}
	});

	//添加一级分类点击事件
	$('.links').on('click', 'a', function () {
		var id = $(this).attr('data-id');

		$(this).addClass('active').siblings().removeClass('active');

		getSecondCategory(id);
	})
});

//根据一级分类id关联二级分类
function getSecondCategory(id) {
	$.ajax({
		url: '/category/querySecondCategory',
		type: 'get',
		data: {
			id: id
		},
		success: function (response) {
			var html = template('category-second', response);

			$('.brand-list').html(html);
		}
	})
}