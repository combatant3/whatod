/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  'get /': 'IndexController.homeRedirect',
  'get /sign-in': 'IndexController.loginPage_GET',
  'post /sign-in': 'IndexController.loginPage_POST',

  // User Routes
  'get /dashboard': 'DashboardController.dashboardPage_GET',
  'get /create-user': 'UserController.createUser_GET',
  'post /create-user': 'UserController.createUser_POST',
  'get /user/:username': 'UserController.readUser',

  // Course Routes
  'get /course/create': 'CourseController.createCourse_GET',
  'post /course/create': 'CourseController.createCourse_POST',

  // GradeComponent Routes
  'get /grade-component/create': 'GradeComponentController.createGradeComponent_GET',
  'post /grade-component/create': 'GradeComponentController.createGradeComponent_POST',

  // Assignment Routes
  'get /assignment/create': 'AssignmentController.createAssignment_GET',
  'post /assignment/create': 'AssignmentController.createAssignment_POST'

};
