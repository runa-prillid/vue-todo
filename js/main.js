var app = new Vue({
	el: '#app',
	data: {
		itemStatuses: ['未着手', '進行中', '完了'],
		newTodo: {
			id: 4,
			status: '未着手',
			title: ''
		},
		todos: [
			{
				id: 1,
				status: '未着手',
				title: 'test'
			},
			{
				id: 2,
				status: '進行中',
				title: 'test2'
			},
			{
				id: 3,
				status: '完了',
				title: 'test3'
			}
		],
	},
	methods: {
		addTodo() {
			if (this.newTodo.title) {
				// var item = {
				// 	id: this.newTodo.id,
				// 	status: this.newTodo.status,
				// 	title: this.newTodo.title
				// };
				this.todos.push({ ...this.newTodo });	//スプレッド構文で新しいタスクを追加
				this.newTodo.title = '';				//newTodoをリセットする
				this.newTodo.status = '未着手';
				this.newTodo.id++;
			}
		},
		deleteTodo(index) {
			if (confirm('本当に削除しますか？')) {
				this.todos.splice(index, 1);
			}
		}
	}
})