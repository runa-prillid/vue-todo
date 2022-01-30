var app = new Vue({
	el: '#app',
	filters: {
		stateColor(state) {
			switch (state) {
				case '未着手':
					return 'untouched';
					break;
				case '進行中':
					return 'ongoing';
					break;
				case '完了':
					return 'completed';
				default:
					return '';
			}
		}
	},
	data: {
		itemFilters: ['全て表示', '未着手', '進行中', '完了'],
		filterLabel: '全て表示',
		itemStatuses: ['未着手', '進行中', '完了'],
		isShowEditForm: false,
		newTodo: {
			id: 4,
			status: '未着手',
			title: ''
		},
		editedTodo: {
			id: 0,
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
	computed: {
		filterdTodos() {
			if (this.filterLabel === '全て表示') {
				return this.todos;
			} else {
				return this.todos.filter(todo => todo.status === this.filterLabel);
			}
		}
	},
	watch: {
		todos: {
			handler() {
				localStorage.setItem('todos', JSON.stringify(this.todos)) || [];
			},
			deep: true
		}
	},
	// mounted() {
	// 	this.todos = JSON.parse(localStorage.getItem('todos'));
	// },
	methods: {
		addTodo() {
			if (this.newTodo.title) {
				this.todos.push({ ...this.newTodo });	//スプレッド構文で新しいタスクを追加
				this.newTodo.title = '';				//newTodoをリセットする
				this.newTodo.status = '未着手';
				this.newTodo.id++;
			}
		},
		editTodo(id) {
			//id - 1 のオブジェクトが必ずしも配列のインデックスと合致するとは限らないことに注意(削除など)
			this.editedTodo = { ...this.todos.find(todo => todo.id === id) };
			this.isShowEditForm = true;
		},
		updateTodo() {
			const index = this.todos.findIndex(todo => todo.id === this.editedTodo.id);
			this.todos[index] = this.editedTodo; //これにスプレッド構文を使わなくてもいいのはなぜ？
			this.isShowEditForm = false;
		},
		deleteTodo(id) {
			const index = this.todos.findIndex(todo => todo.id === id);
			if (confirm('本当に削除しますか？')) {
				this.todos.splice(index, 1);
			}
		}
	}
})