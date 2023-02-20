import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Subscription } from 'rxjs';
import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private subscription: Subscription;

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.subscription = this.postService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });

    this.onFetchPosts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createAndStorePost(postData);
  }

  onFetchPosts() {
    // Send Http request
    //this.postService.fetchPost();
    this.isFetching = true;
    this.postService.fetchPost().subscribe(
      (post) => {
        this.isFetching = false;
        this.loadedPosts = post;
      },
      (error) => {
        this.isFetching = false;
        this.error = error.message;
      }
    );
  }

  onClearPosts() {
    this.postService.deletePost().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  onHandleError() {
    this.error = null;
  }
}
