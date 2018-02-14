import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions,ResponseContentType} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {environment} from '../../environments/environment.prod';

@Injectable()
export class AllPostsService {

  constructor(private http:Http) { }

  // -------------------------------------- used for fetching articles on home page ---------------------
	
	allPosts(userId):  Observable<any> {
        let api =  environment.endPoint+"allPosts/"+userId;
        return this.http.get(api)
        .map(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    // ------------------------------used For linking the article-------------------------

    likePost(articleLikeData): Observable<any>{
        let api = environment.endPoint+"postLike";
        let body= articleLikeData;
        return this.http.post(api,body)
        .map(response =>{
            return response.json();
        }).catch(error =>{
            return error;
        })
    }


   // ------------------------------used to comment the article------------------------- 
    commentPost(articleCommentData): Observable<any>{
        let api = environment.endPoint+"postComment";
        let body = articleCommentData;
        return this.http.post(api,body)
        .map(response=>{
             return response.json();
        }).catch(error => {
            return error
        })
    }

   // ------------------------------used to save the article------------------------- 
    savePost(savePostData):Observable<any>{
        let api = environment.endPoint+"savePost"
        let body = savePostData
        return this.http.post(api,body)
        .map(response=>{
            return response.json();
        }).catch(error=>{
            return error
        })
    }

    // ------------------------------used to increase the views of articles------------------------- 
    viewPost(postid,userid,sectionid,categoryid){
        let api=environment.endPoint+"pageViewed/"+postid+"/"+userid+"/"+sectionid+"/"+categoryid;
         return this.http.get(api)
        .map(response =>{
            return response.json();
        }).catch(error =>{
            return error;
        })
    }


    // ------------------------------used to get the list of saved articles------------------------- 
    getSavedPosts(userId):Observable<any>{
        let api=environment.endPoint+"savedPosts/"+userId;
        return this.http.get(api)
        .map(response=>{
            return response.json();
        }).catch(error=>{
            return error;
        })
    }

    // ------------------------------used to increase the continueReading Count of articles------------------------- 
    continueReading(contentId):Observable<any>{
        let api=environment.endPoint+"continueReading/"+contentId;
        return this.http.get(api)
        .map(response=>{
            return response.json();
        }).catch(error=>{
            return error;
        })
    }
    
     // ------------------------------used to get the list of contributed articles------------------------- 
    savedContributions(userId):Observable<any>{
        let api=environment.endPoint+"savedContributions/"+userId;
        return this.http.get(api)
        .map(response=>{
            return response.json();
        }).catch(error=>{
            return error;
        })
    }
   
    // ------------------------------used to get the list of districts and blocks -------------------------
    getJSON(): Observable<any> {
        console.log("json function")
         return this.http.get('assets/state_district_blocks_maharashtra.json')
         .map((res:any) => {return res.json()})
         .catch(error=> {
             return error
         });
    }


    // ------------------------------used for call-to-action button( intersted button)-------------------------

    interested(userId,contentId): Observable<any>{
        let api = environment.endPoint+"interested/"+userId+"/"+contentId;
        return this.http.get(api)
        .map(response =>{
            return response.json();
        }).catch(error =>{
            return error;
        })
    }

    // ------------------------------used for call-to-action button( call button)-------------------------
    call(userId,contentId): Observable<any>{
        let api = environment.endPoint+"call/"+userId+"/"+contentId;
        return this.http.get(api)
        .map(response =>{
            return response.json();
        }).catch(error =>{
            return error;
        })
    }

    // ------------------------------used for call-to-action button( call me back button )-------------------------
    callmeback(userId,contentId): Observable<any>{
        let api = environment.endPoint+"callmeback/"+userId+"/"+contentId;
        return this.http.get(api)
        .map(response =>{
            return response.json();
        }).catch(error =>{
            return error;
        })
    }

    // ------------------------------used for call-to-action button( apply button )-------------------------
    apply(userId,contentId): Observable<any>{
        let api = environment.endPoint+"apply/"+userId+"/"+contentId;
        return this.http.get(api)
        .map(response =>{
            return response.json();
        }).catch(error =>{
            return error;
        })
    }

    // ------------------------9-12-2017---------------------------------------

    // ------------------------------used for user-engagement button(like button )-------------------------
    likeParticularSection(data):Observable<any>{
        let api = environment.endPoint+"likeParticularSection"
        let body = data
        return this.http.post(api,body)
        .map(response=>{
            return response.json();
        }).catch(error=>{
            return error
        })
    }

    // ------------------------------used to fetch the list of all members-------------------------
    getAllMembers(){
        let api =environment.endPoint+"getAllMembers";
        return this.http.get(api)
        .map(response=>{
            return response.json();
        }).catch(error=>{
            return error;
        })
    }

    // ------------------------------used to get the article by slug-------------------------
    getPost(slug){
        let api =environment.endPoint+"getPost/"+slug;
        return this.http.get(api)
        .map(response=>{
            return response.json();
        }).catch(error=>{
            return error;
        })
    }

    // ------------------------------used to get the categories under a section  by section id-------------------------
    getCategory(sectionId){
        let api = environment.endPoint+"getCategories/"+sectionId;
        return this.http.get(api)
        .map(response=>{
            return response.json();
        }).catch(error=>{
            return error;
        })
    }

    // ------------------------------used to get the subCategories under a category  by categoryid-------------------------

    getSubCategory(categoryId){
        let api = environment.endPoint+"getSubCategories/"+categoryId;
        return this.http.get(api)
        .map(response=>{
            return response.json();
        }).catch(error=>{
            return error;
        })
    }

    // ------------------------------used to get the Articles under a subCtegory  by categoryid &  subCategoryId -------------------------

    getArticle(categoryId,subCategoryId){
        let api = environment.endPoint+"getArticles/"+categoryId+"/"+subCategoryId;
        return this.http.get(api)
        .map(response=>{
            return response.json();
        }).catch(error=>{
            return error;
        })
    }

    // ------------------------------To check articles present or not under the subcategory -------------------------
    getArticlesCount(categoryId,subCategoryId){
        let api = environment.endPoint+"getArticlesCount/"+categoryId+"/"+subCategoryId;
        return this.http.get(api)
        .map(response=>{
            return response.json();
        }).catch(error=>{
            return error;
        })
    }

    // ------------------------------To check subcategory present or not under the category -------------------------

     getSubCategoryCount(categoryId){
        let api = environment.endPoint+"getSubCategoriesCount/"+categoryId;
        return this.http.get(api)
        .map(response=>{
            return response.json();
        }).catch(error=>{
            return error;
        })
    }

    // ------------------------------To delete the profile image -------------------------
    deleteImage(userId){
        let api = environment.endPoint+"deleteImage/"+userId;
        return this.http.get(api)
        .map(response=>{
            return response.json();
        }).catch(error=>{
            return error;
        })
    }

}
