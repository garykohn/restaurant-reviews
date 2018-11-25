import { ApiResponseModelProperty } from '@nestjs/swagger';
import { ReviewAuthor } from 'reviews/model/review-author.model';
import { Review } from 'reviews/model/review.model';
import { Transform } from 'class-transformer';

/**
 * Place Review Model
 *
 * Describes a review embedded in a place object.
 */
export class PlaceReview {
  /**
   * Review id
   */
  @ApiResponseModelProperty()
  public id: string;

  /**
   * Review author
   */
  @ApiResponseModelProperty()
  public author: ReviewAuthor;

  /**
   * Review rating
   */
  @ApiResponseModelProperty()
  public rating: number;

  /**
   * Date of the visit
   */
  @ApiResponseModelProperty()
  public dateVisitted: string;

  /**
   * Review comment text
   */
  @ApiResponseModelProperty()
  public comment: string;

  /**
   * Review reply left by the place owner
   */
  @ApiResponseModelProperty()
  public reply?: string;

  /**
   * Describes whether the user can reply to the review
   */
  @ApiResponseModelProperty()
  @Transform((value: boolean) => value || undefined)
  public canReply?: boolean;

  /**
   * Describe whether the user can edit the place
   */
  @ApiResponseModelProperty()
  @Transform((value: boolean) => value || undefined)
  public canEdit?: boolean;

  /**
   * Describe whether the user can delete the place
   */
  @ApiResponseModelProperty()
  @Transform((value: boolean) => value || undefined)
  public canDelete?: boolean;

  /**
   * Constructor
   */
  constructor(values: Partial<PlaceReview>) {
    Object.assign(this, values);
  }
  /**
   * Create PlaceReview from Review
   */
  public static fromReview(review: Review): PlaceReview {
    return new PlaceReview({
      id: review.id,
      author: review.author,
      rating: review.rating,
      dateVisitted: review.dateVisitted,
      comment: review.comment,
      reply: review.reply,
      canReply: review.canReply,
      canEdit: review.canEdit,
      canDelete: review.canDelete,
    });
  }
}
