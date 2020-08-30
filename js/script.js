{
  'use strict';

  const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles',
        optArticleTagSelector = '.post-tags .list',
        optArticleAuthorSelector = '.post-author';
        optTagListSelector = '.tags.list',
        optCloudClassCount = 5,
        optCloudClassPrefix = 'tag-size-';

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


  function calculateTagsParams(obj){
    const params = {min:100, max:0};
    for(let key in obj){
      params.min = Math.min(obj[key], params.min);
      params.max = Math.max(obj[key], params.max)
    }
     return params;
  }

function calculateTagsClass(count, params){
  const classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * (optCloudClassCount - 1) + 1 );
  return(optCloudClassPrefix + classNumber);
}

  // [DONE] GENEROWANIE TAGÓW POD ARTYKUŁAMI
  function generateTags() {

    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

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


        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]){
          /* [NEW] add generated code to allTags object */
          allTags[tag]=1;
        } else {
          allTags[tag]++;
        }
        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
     tagList.innerHTML = html;
      // tu wyświetlają się tagi pod artykułami

    /* END LOOP: for every article: */
    }

    /* find list of tags in right column */
    const tagList = document.querySelector('.tags');

    /* [NEW] create variable for all links HTML code */
let allTagsHTML = '';

const tagsParams = calculateTagsParams(allTags);
console.log('tagsParams:', tagsParams);

/* [NEW] START LOOP: for each tag in allTags: */
for(let tag in allTags){
  /* [NEW] generate code of a link and add it to allTagsHTML */
  allTagsHTML += '<a href="#tag-' + tag + '" class="' + calculateTagsClass(allTags[tag], tagsParams) + '"><span>' + tag + '</span></a> ';
}
/* [NEW] END LOOP: for each tag in allTags: */

/*[NEW] add HTML from allTagsHTML to tagList */
tagList.innerHTML = allTagsHTML;
}
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

    /* [NEW] create a new variable allAuthorArticles with an empty object */
    let allAuthorArticles = {};

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

       /* [NEW] check if this link is NOT already in allAuthorArticles */
       if(!allAuthorArticles[articleAuthor]){
        /* [NEW] add generated code to allAuthorArticles object */
        allAuthorArticles[articleAuthor]=1;
      } else {
        allAuthorArticles[articleAuthor]++;
      }

      /* [DONE] insert data-author attribute into the author wrapper */

      authorField.innerHTML = html; //tu się wyświetla autor ponizej tytułu

      /* [DONE] END LOOP: for every article: */
    }
    /* find list of tags in right column */
    const authorsList = document.querySelector('.sidebar .authors');
    console.log('authorsList:', authorsList);


    /* [NEW] create variable for all links HTML code */
    let allAuthorsHTML = '';
    console.log('allAuthorsHTML:', allAuthorsHTML);
 //const authorsParams = calculateAuthorsParams(allTags);
 //console.log('authorsParams:', authorsParams);

 /* [NEW] START LOOP: for each articleAuthor in allAuthorArticles: */
 for(let articleAuthor in allAuthorArticles){
   /* [NEW] generate code of a link and add it to allAuthorsHTML */
   allAuthorsHTML += '<a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a>(' + allAuthorArticles[articleAuthor] + ')<br>' ;
 console.log('allAuthorsHTML:', allAuthorsHTML);

 /* [NEW] END LOOP: for each articleAuthor in allAuthorArticles: */
  }
 /*[NEW] add HTML from allAuthorsHTML to authorsList */
 authorsList.innerHTML = allAuthorsHTML;
 console.log('authorList:', authorsList);
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
