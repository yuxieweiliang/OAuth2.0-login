# Program API

this is a description file, please see the details,
I use the JWT, and the Open API Only `/user/sign`

## Content Table of API LIST

- [user](./user.md)
- [role](./role.md)
- [rights](./rights.md)
- [category](./category.md)
- [product](./product.md)
- [upload](./upload.md)

### user

1. get users:  `GET|POST /user`
2. user sign:  `POST /user/sign`
3. create(register) user:  `POST /user/\d+`
4. modify user info: `PUT /user/\d+` === `POST /user/\d+/update`
5. delete(disabled) user: `DELETE /user/\d+` === `POST /user/\d+/delete`

### category

1. get categories: `GET|POST /category`
2. create category by user: `POST /category/(\d+)\/?`
3. get user's category: `GET /category/(\d+)\/(\d+)\/?`
4. modify category info: `PUT /category/(\d+)\/(\d+)\/?` === `POST /category/\d+/update`
5. delete(disabled) category: `DELETE /category/(\d+)\/(\d+)\/?` === `POST /category/\d+/delete`

### role

1. get roles: `GET|POST /role`
2. create role by user: `POST /role/(\d+)\/?`
3. get user's role: `GET /role/(\d+)\/(\d+)\/?`
4. modify(update) role info by user: `PUT /role/(\d+)\/(\d+)\/?` === `POST /role/\d+/update`
5. delete(disabled) role:  `DELETE /role/(\d+)\/(\d+)\/?` === `POST /role/\d+/delete`

### rights

1. get rights list: `GET|POST /rights`
2. create rights by user : `POST /rights/(\d+)\/?`
3. get user's rights: `GET /rights/(\d+)\/(\d+)\/?`
4. modify(update) rights info by user: `PUT /rights/(\d+)\/(\d+)\/?` === `POST /rights/\d+/update`
5. delete(disabled) rights: `DELETE /rights/(\d+)\/(\d+)\/?` === `POST /rights/\d+/delete`

### product

1. get product's list: `GET|POST /product`
2. get user's product list: `GET /product/(\d+)\/?`
3. get user's product: `GET /product/(\d+)\/(\d+)\/?`
4. create(upload) a product: `POST /product/(\d+)\/?`
5. modify(update) product info: `PUT /product/(\d+)\/(\d+)\/?` === `POST /product/\d+/update`
6. delete(disabled) a product: `DELETE /product/(\d+)\/(\d+)\/?` === `POST /product/\d+/delete`
7. collect a product: `POST (\d+)\/(\d+)\/collect\/?$/`
8. Is a product thumb up: `POST (\d+)\/(\d+)\/great\/?$/`

### upload

1. download file: `GET /file/:id`
2. upload file: `POST /file/`
3. update(modify) file: `PUT /file/:id` === `POST /file/:id/update`
4. delete(remove) file: `DELETE /file/:id` === `POST /file/:id/delete`

### comment

1. create a project : `POST /comment/project`
    ```javascript
      // 参数
      body = {
        name: '', // String - requried
        url: '', // String - requried
        intro: '', // String
        status: '' // Number
      }
    ```
2. get all project : `GET /comment/project`
3. delete a project : `DELETE /comment/project` === `POST /comment/project/delete`
    ```javascript
       // 参数
       body = {
         id: -1 // String - required
       }
    ```
4. update a project : `PUT /comment/project` === `POST /comment/project/update`
    ```javascript
     // 参数
       body = {
          id: -1 ,// String - required
          name: '', // String - requried
          url: '', // String - requried
          intro: '', // String
          status: '' // Number
       }
    ```
5. get all subject : `GET /comment/subject`
    ```javascript
      // 参数
      query = {
        project: -1 // Number - allow null
      }
    ```
6. create a subject : `POST /comment/subject`
    ```javascript
       body = {
         project: -1, // Number - requried
         name: '', // String - requried
         intro: '', // String
         status: 1 // Number
       }
    ```
7. delete a subject : `DELETE /comment/subject` === `POST /comment/subject/delete`
    ```javascript
       body = {
         id: -1 // Number - required
       }
    ```
8. update a subject : `PUT /comment/subject` === `POST /comment/subject/update`
    ```javascript
       body = {
         id: -1, // Number - required  --------- project does not update
         name: '', // String - requried
         intro: '', // String
         status: 1 // Number
       }
    ```
9. create a comment : `POST /comment/`
    ```javascript
       body = {
          project: -1, // Number - project ID
          subject: -1, // Number - subject ID
          target : -1, // Number - target ID
          father: -1,  // Number - The parent of the current comment
          user: -1,    // Number - user ID The user ID that initiated the comment
          body: '',    // String - comment content
          voice: ''    // String - voice-url
       }
    ```
10. delete a comment : `DELETE /comment/` === `POST /comment/delete`
    ```javascript
       body = {
          project: -1, // Number - project ID
          subject: -1, // Number - subject ID
          target : -1, // Number - target ID
          id : -1,     // Number - comment ID
       }
    ```
11. update a comment : `PUT /comment` === `POST /comment/update`
    ```javascript
       body = {
          project: -1, // Number - project ID
          subject: -1, // Number - subject ID
          target : -1, // Number - target ID
          id: -1,      // Number - comment ID

          body: '',    // String - comment content
          voice: '',   // String - voice-url
          great: 0,    // Number - some praise the number
          status: 1,   // Number - status
       }
    ```
12. get comment : `GET /comment`
    ```javascript
       body = {
          pageNo  : 0, // number - page Number
          pageSize: 0, // number - page Size
          target  : 0, // number - target ID
          project : 0, // number - project ID
          subject : 0, // number - project subject ID
          orderby : 0, // object - order by rule --> 'status', 'great', 'updated_at'
       }
    ```
