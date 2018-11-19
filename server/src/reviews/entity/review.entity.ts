import { PlaceEntity } from 'places/entity/place.entity';
import { ReviewAuthor } from 'reviews/model/review-author.model';
import { Review } from 'reviews/model/review.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { UserEntity } from 'user/entity/user.entity';

/**
 * Review Entity
 *
 * Describes storage schema for review objects
 */
@Entity()
@Index(['pendingFor', 'createdAt']) // Index for retrieving pending reviews
@Index(['place', 'createdAt']) // Index for retrieving place reviews
export class ReviewEntity {
  /**
   * Review id
   */
  @PrimaryColumn('uuid')
  public id: string;

  /**
   * Associated place
   */
  @ManyToOne(() => PlaceEntity, { onDelete: 'CASCADE' })
  public place: PlaceEntity;

  /**
   * Review author
   */
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  public author: UserEntity;

  /**
   * Review Rating
   */
  @Column({ type: 'float', default: 0 })
  public rating: number;

  /**
   * Comment text
   */
  @Column({ type: 'text' })
  public comment: string;

  /**
   * Reply text
   */
  @Column({ type: 'text', nullable: true })
  public reply?: string | null;

  /**
   * Date of the visit
   */
  @Column({ type: 'date' })
  public dateVisitted: string;

  /**
   * Timestamp of the review creation
   */
  @CreateDateColumn()
  public createdAt: Date;

  /**
   * References a user for whom the review is pending
   *
   * Auxilary column to speed up pending review retrieval. Is set to
   * NULL after reply.
   */
  @Column({ type: 'uuid', nullable: true })
  public pendingFor: string | null;

  /**
   * Transform entity to domain model
   */
  public toModel(): Review {
    return new Review({
      id: this.id,
      place: this.place ? this.place.toModel() : undefined,
      author: this.author
        ? new ReviewAuthor({
            id: this.author.id,
            name: this.author.name,
          })
        : undefined,
      rating: this.rating,
      comment: this.comment,
      reply: this.reply || undefined,
      dateVisitted: this.dateVisitted,
    });
  }
}