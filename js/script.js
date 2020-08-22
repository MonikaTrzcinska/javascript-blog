{
  'use strict';
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);
    
    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    console.log('clickedElement:', clickedElement);
    console.log('clickedElement (with plus):' + clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts .active');

    for(let activeArticle of activeArticles){
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
    optArticleTagsSelector = '.post-tags, .list';

  function generateTitleLinks(){

    /* [DONE] remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    console.log('optTitleListSelector', optTitleListSelector);
    function clearMessages(){
      titleList.innerHTML = '';
    }
    clearMessages();

    /* [DONE] for each article */

    const articles = document.querySelectorAll(optArticleSelector);
    let html = '';
    for (let article of articles){
      
      /* [DONE] get the article id */

      const articleId = article.getAttribute('id');
      console.log('article ID:', articleId);

      /* [DONE] find the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    
      /* [DONE] get the title from the title element */


      /* [DONE] create HTML of the link */

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</SPAN></a></li>';
      console.log('link HTML:', linkHTML);

      /* [DONE] insert link into html variable */

      html= html + linkHTML;

      /* insert link into titleList */

      //titleList.innerHTML = titleList.innerHTML + linkHTML;
      //titleList.insertAdjacentHTML('beforeend', linkHTML);
      console.log('html variable =', html);
    }
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }

  }

  generateTitleLinks();

  function generateTags(){
    /* find all articles */
  
    /* START LOOP: for every article: */
  
      /* find tags wrapper */
  
      /* make html variable with empty string */
  
      /* get tags from data-tags attribute */
  
      /* split tags into array */
  
      /* START LOOP: for each tag */
  
        /* generate HTML of the link */
  
        /* add generated code to html variable */
  
      /* END LOOP: for each tag */
  
      /* insert HTML of all the links into the tags wrapper */
  
    /* END LOOP: for every article: */
  }
  
  generateTags();
}
