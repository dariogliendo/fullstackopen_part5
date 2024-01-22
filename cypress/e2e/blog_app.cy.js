describe('Blog app', function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset")
    cy.request("POST", "http://localhost:3001/api/users/", {
      username: "dliendo",
      name: "Dario Liendo",
      password: "password"
    })
  })

  describe("Login", () => {
    beforeEach(function () {
      cy.visit("http://localhost:5173")
    })

    it("Login form is shown", function () {
      cy.contains("Username")
      cy.contains("Password")
    })

    it("Succeeds on correct credentials", function () {
      cy.get("input[name='username']").type("dliendo")
      cy.get("input[name='password']").type("password")
      cy.contains("Login").click()
      cy.contains("Logged in successfully")
      cy.get(".notification").should("have.css", "color", "rgb(0, 128, 0)")
    })

    it("Fails on wrong credentials", function () {
      cy.get("input[name='username']").type("dliendo")
      cy.get("input[name='password']").type("wrong")
      cy.contains("Login").click()
      cy.contains("invalid username or password")
      cy.get(".notification").should("have.css", "color", "rgb(255, 0, 0)")
    })
  })

  describe("Once logged in", function () {
    beforeEach(function () {
      cy.login({ username: "dliendo", password: "password" })
    })

    it("A blog can be created", function () {
      cy.get("#new-blog-button").click()
      cy.get("input[name='title']").type("test blog")
      cy.get("input[name='author']").type("test author")
      cy.get("input[name='url']").type("http://test.com")
      cy.contains("Submit").click()
      cy.contains("a new blog test blog by test author added")
      cy.contains("test blog")
    })

    describe("Interactions with already created blog", () => {
      beforeEach(function () {
        cy.createBlog({ title: "test blog", author: "test author", url: "http://test.com" })
        cy.visit("http://localhost:5173")
      })

      it("A blog can be liked", function () {
        cy.get('.blog-container')
        cy.get(".blog-container").contains("Show Details").click()
        cy.get(".blog-container")
          .find("#like-button")
          .click()
        cy.get(".blog-container").contains("Likes: 1")
      })

      it("A blog can be removed", function () {
        cy.get('.blog-container')
        cy.get(".blog-container").contains("Show Details").click()
        cy.get(".blog-container")
          .find("#remove-button")
          .click()
        cy.get(".blog-cotainer").should("not.exist")
      })

      it("A blog can't be removed by another user", function () {
        cy.createUser({ username: "jackt", name: "Jack Testing", password: "test" })
        cy.login({ username: "jackt", password: "test" })
        cy.get(".blog-container")
        cy.get(".blog-container").contains("Show Details").click()
        cy.get(".blog-container")
          .find("#remove-button")
          .should("not.exist")
      })

    })

    describe("Interactions with several blogs", () => {
      it("Blog with more likes is shown first", function() {
        cy.createBlog({ title: "Least Likes", author: "test author", url: "http://test.com" })
        cy.createBlog({ title: "Middle", author: "test author", url: "http://test.com" })
        cy.createBlog({ title: "Most Likes", author: "test author", url: "http://test.com" })
        cy.visit("http://localhost:5173")
        cy.contains("Most Likes").parent().parent().as("mostLikes")
        cy.get("@mostLikes")
          .contains("Show Details")
          .click()
        // Like 1
        cy.get("@mostLikes")
          .find("button")
          .contains("Like")
          .click()
        cy.get("@mostLikes")
          .should("contain", "Likes: 1")
        // Like 2
        cy.get("@mostLikes")
          .find("button")
          .contains("Like")
          .click()
        cy.get("@mostLikes")
          .should("contain", "Likes: 2")
          // Like 3
        cy.get("@mostLikes")
          .find("button")
          .contains("Like")
          .click()
        cy.get("@mostLikes")
          .should("contain", "Likes: 3")
      
        cy.contains("Middle").parent().parent().as("middle")
        cy.get("@middle")
          .contains("Show Details")
          .click()
        cy.get("@middle")
          .find("button")
          .contains("Like")
          .click()
  
        cy.get(".blog-container").eq(0).should("contain", "Most Likes")
        cy.get(".blog-container").eq(1).should("contain", "Middle")
        cy.get(".blog-container").eq(2).should("contain", "Least Likes")
      })
    })
  })
})