
var coursesApi = 'http://localhost:3000/courses'
var courses_1 = []
function start() {
    getCourses(renderCourses)
    handleCreateForm()
}

start();

// function get courses
function getCourses(callback) {
    fetch('http://localhost:3000/courses')
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            courses_1 = data
        })
        .then(callback)
}

// function create courses
function createCourses(data) {
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": 'no-cache',
            "Pragma": "no-cache"
        },
        body: JSON.stringify(data)
    }
    fetch(coursesApi, options)
        .then(function (response) {
            return response.json()
        })
        .then(function (newCourses) {
            courses_1.push(newCourses)
            renderCourses()
        },)
}

function handleDeleteCourses(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(coursesApi + '/' + id, options)
        .then(function (response) {
            return response.json()
        })
        .then(function () {
            var courseItem = document.querySelector(".course-Item" + id)
            if (courseItem) {
                courseItem.remove()
            }
        })
}

// function render courses
function renderCourses() {
    var lsitCousrsesBlock =
        document.querySelector('#list-courses')
    console.log(courses_1)
    var htmls = courses_1.map(function (course, index) {
        return `
        <li class = "course-Item${course.id}">
            <h4>${course.name}</h4>
            <p>${course.description}<P>
            <button onclick = "handleDeleteCourses(${course.id})">xóa</button>
            <button onclick = "handleEditCourses(${course.id})">sửa</button>
        </li>`
    })

    lsitCousrsesBlock.innerHTML = htmls.join('')
}

function handleCreateForm() {
    var createBtn = document.querySelector('#btn')

    createBtn.onclick = function () {
        var nameInput = document.querySelector('#name')
        var descriptionInput = document.querySelector('#description')

        var name = nameInput.value
        var description = descriptionInput.value

        var formData = {
            name: name,
            description: description
        }

        createCourses(formData)
        // createCourses(formData,getCourses(renderCourses))
        nameInput.value = ""
        descriptionInput.value = ""
    }
}

