/**
 * 
 */
var zTreeObj;

// zTree configuration information, refer to API documentation (setting details)




/**
 * 문서 상위분류 리스트 뿌려주기
 */

var upArr = new Array();


let x = new Array();
let z = new Array();
//두번째 자식
let xz = new Array();
$('.get-up-code-name').each(function(i, item) {

	upCodeName = $(this).attr('data-up-code-name');
	codeName = $(this).attr('data-code-name');
	cd = $(this).attr('data-up-type-cd');
	no = $(this).attr('data-up-no');
	approvalForm = $(this).html();


	let y = [];
    i=i+1;
	if (y.name == codeName && codeName == '') {
		return;
		}
		y.name = codeName;
		y.pId = i;
		y.id = '2';
		y.cd = cd;
		y.no = no;
		y.upCd = upCodeName;
		y.form = approvalForm;
		
    
	

	//첫번째 자식
	let r = [];
	
    
   
	r.name = upCodeName;
	r.pId = '0';
	r.id = i;
	r.cd = cd
	r.no = no;
	r.open = 'true'
	
	
    
    upArr.push(r)
    /*중복제거*/
const result=upArr.reduce((acc, v) => {
    return acc.find(x => x.name === v.name) ? acc : [...acc, v];
}, []);

console.log(result)
upArr=result;


/*중복제거한 후에 
* 부모값있는지체크
*/
   const unique = upArr.map(function (val, index) {
	return val['id'];
}).filter(function (val, index, arr) {
	return arr.indexOf(val) === index;
});

   console.log(unique);
   console.log(unique.includes(y.pId))
   if(!unique.includes(y.pId)){
	   unique.pop();
	   y.pId=unique.at(-1);
   }
   
   
   console.log(y)
   upArr.push(y)
   
})

const result=upArr.reduce((acc, v) => {
    return acc.find(x => x.name === v.name) ? acc : [...acc, v];
}, []);

console.log(result)
upArr=result;
/* const unique = upArr.map(function (val, index) {
	return val['name'];
}).filter(function (val, index, arr) {
	return arr.indexOf(val) === index;
});
console.log(unique)*/

x.name = '성호페인트 문서함';
x.id = '0';
x.pId = 'root';
x.open = 'true';
upArr.push(x);

/** 트리 설정
 * 
*/
var setting = {
	check: {
		autoCheckTrigger: false,
		chkStyle: "checkbox",
		enable: true,
		chkboxType: { "Y": "ps", "N": "ps" },
		nocheckInherit: false,
		chkDisabledInherit: false,
		radioType: "level"
	},
	callback: {
		onCheck: upDocumentCheck,

	},
	data: {
		simpleData: {
			enable: true,

		}
	},





};

function upDocumentCheck(event, treeId, treeNode) {



	otherNodes = $('#' + treeNode.tId).siblings();

	/*	for (let i = 0; i < otherNodes.length; i++) {
			node = otherNodes.get(i);
	
			span = node.children.item(1)
			span.className = 'button chk checkbox_false_full';
	
		}*/


	nodes = treeNode.getParentNode();

	let childArr = nodes.children;
	for (i of childArr) {
		if (treeNode.name != i.name) {
			i.checked = false;
			zTreeObj.updateNode(i)
		}
		if (i.children != null) {
			for (n of i.children) {
				n.checked = false;
				zTreeObj.updateNode(n);
			}
		}

	}


	if (treeNode.children != null) {
		console.log('자식 있음')
	} else {
		console.log('자식 없음')
	}

	console.log(treeNode.cd)
	console.log(treeId)
	console.log(event)
	$('#up-type-cd').val(treeNode.cd);
	$('#up-type-no').val(treeNode.no);

	/** add*/
	let checkHtml = treeNode.form;

	$('#form_list').html(checkHtml);


}





// zTree data attributes, refer to the API documentation (treeNode data details)





var zNodes = upArr;
//[{name:"성호페인트 문서함", id: '0'}]


console.log(zNodes)
$(document).ready(function() {
	zTreeObj = $.fn.zTree.init($("#document-tree"), setting, zNodes);

})









$('#form-modal-btn').click(function() {
	var modalNodes = formNodes;
	zTreeObj = $.fn.zTree.init($("#form"), setting, modalNodes);
});




