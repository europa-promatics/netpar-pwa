export class ArticleLikeModel {
	userId:string;
	articleName:string;
	articleId:string;
	userPhone:string;
}

export class ArticleCommentModel {
	userId:string;
    articleName:string;
    articleId:string;
    userPhone:string;
    userName:string;
    userComment:string;
    sectionName:string;
    categoryName:string;
    subCategoryName:string;
    language:string;
}

export class SaveArticle {
    user_id:string;
    content_name:string;
    content_id:string;
}