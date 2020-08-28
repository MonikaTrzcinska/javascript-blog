{
  'use strict';
  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    console.log('clickedElement:', clickedElement);
    console.log('clickedElement (with plus):' + clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts .active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /*  [DONE]get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');
    console.log('articleSelector:', articleSelector);

    /*  [IN PROGRES] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);
    console.log('targetArticle:', targetArticle);

    /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active');
  };

  // const links = document.querySelectorAll('.titles a');
  // for(let link of links){
  //   link.addEventListener('click', titleClickHandler);
  // }

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author';
    optTagListSelector = '.tags.list'

    // GENEROWANIE LISTY TYTUŁOW W LEWEJ KOLUMNIE
  function generateTitleLinks(customSelector = '') {

    /* [DONE] remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    function clearMessages() {
      titleList.innerHTML = '';
    }
    clearMessages();

    /* [DONE] for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html = '';

    for (let article of articles) {

      /* [DONE] get the article id */

      const articleId = article.getAttribute('id');
      console.log('article ID:', articleId);

      /* [DONE] find the title element */
      /* [DONE] get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* [DONE] create HTML of the link */

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log('link HTML:', linkHTML);

      /* [DONE] insert link into html variable */
      html = html + linkHTML;

      /* insert link into titleList */

      //titleList.innerHTML = titleList.innerHTML + linkHTML;
      //titleList.insertAdjacentHTML('beforeend', linkHTML);
      console.log('html variable =', html);
    }
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
      console.log('html:', html);
    }

  }
  generateTitleLinks();

  // [DONE] GENEROWANIE TAGÓW POD ARTYKUŁAMI
  function generateTags() {

    /* create a new variable allTags with an empty array */
   // let allTags = [];

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      const tagList = article.querySelector(optArticleTagSelector);
      console.log('tagList:', tagList);

      /* make html variable with empty string */
      var html = ' ';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log('articleTags:', articleTags);

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log('articleTagsArray:', articleTagsArray);

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        console.log('tag:', tag);

        /* generate HTML of the link */
        const tagHTML = '<a href="#tag-' + tag + '"><span>' + tag + '</span></a>';
        console.log('tag HTML:', tagHTML);

        /* add generated code to html variable */
        html = html + '&nbsp;' + tagHTML;

        /* check if this link is NOT already in allTags */
      //  if(allTags.indexOf(linkHTML) == -1){
          /* add generated code to allTags array */
      //    allTags.push(linkHTML);


        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagList.innerHTML = html;
    }

      /* END LOOP: for every article: */
  }
    /* find list of tags in right column */
   // const tagList = document.querySelector('.tags');

    /* [NEW] add html from allTags to tagList */
   // tagList.innerHTML = allTags.join(' ');

  generateTags();

  // [DONE] DODANIE AKCJI PO KLIKNIĘCIU W TAG

  function tagClickHandler() {
    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('Tag was clicked!');

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href =', href);

    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log('tag =', tag);

    /* [DONE] find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    /* [DONE] START LOOP: for each active tag link */
   for (let activeTagLink of activeTagLinks) {

      /* [DONE] remove class active */
      activeTagLink.classList.remove('active');
      /* [DONE] END LOOP: for each active tag link */
    }

    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log('tagLinks:', tagLinks);

    /* [DONE] START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {

      /* [DONE] add class active */
      tagLink.classList.add('active');

      /* [DONE] END LOOP: for each found tag link */
    }

    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags()  {

    /* [DONE] find all links to tags */
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

    /* [DONE] START LOOP: for each link */
    for (let tagLink of tagLinks) {

      /* [DONE] add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);

      /* [DONE] END LOOP: for each link */
    }
  }
  addClickListenersToTags();

  // [DONE] DODANIE NAZWISK AUTOROW POD TYTUŁEM ARTYKUŁU
  function generateAuthors() {

    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* [DONE] START LOOP: for every article: */
    for (let article of articles) {

      /* [DONE] find author wrapper */
      const authorField = article.querySelector(optArticleAuthorSelector);
      console.log('authorField:', authorField);

      //html

      /* [DONE] get Author from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');
      console.log('articleAuthor:', articleAuthor);

      /* make HTML */
      const html = '<a href="#author-' + articleAuthor + '"><span> by ' + articleAuthor + '</span></a>';

      /* [DONE] insert data-author attribute into the author wrapper */

      authorField.innerHTML = html;

      /* [DONE] END LOOP: for every article: */
    }
  }
  generateAuthors();

  // DODANIE AKCJI PO KLIKNIĘCIU W AUTORA

  //function authorClickHandler(event) {
    function authorClickHandler() {
      /* [DONE] prevent default action for this event */
      event.preventDefault();

      /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
      const clickedElement = this;
      console.log('Author was clicked!');

      /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
      const href = clickedElement.getAttribute('href');
      console.log('href =', href);

      /* [DONE] make a new constant "author" and extract tag from the "href" constant */
      const author = href.replace('#author-', '');
      console.log('author =', author);

      /* [DONE] find all author links with class active */
      const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');

      /* [DONE] START LOOP: for each active author link */
     for (let activeAuthorLink of activeAuthorLinks) {

        /* [DONE] remove class active */
        activeAuthorLink.classList.remove('active');
        /* [DONE] END LOOP: for each active tag link */
      }

      /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
      const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
      console.log('authorLinks:', authorLinks);

      /* [DONE] START LOOP: for each found tag link */
      for (let authorLink of authorLinks) {

        /* [DONE] add class active */
        authorLink.classList.add('active');

        /* [DONE] END LOOP: for each found tag link */
      }

      /* [DONE] execute function "generateTitleLinks" with article selector as argument */
      generateTitleLinks('[data-author="' + author + '"]');
    }
  //}

    function addClickListenersToAuthors()  {

      /* [DONE] find all links to authors */
      const authorLinks = document.querySelectorAll('a[href^="#author-"]');

      /* [DONE] START LOOP: for each authorLink */
      for (let authorLink of authorLinks) {

        /* [DONE] add tagClickHandler as event listener for that link */
        authorLink.addEventListener('click', authorClickHandler);

        /* [DONE] END LOOP: for each link */
      }
    }
    addClickListenersToAuthors();

}
