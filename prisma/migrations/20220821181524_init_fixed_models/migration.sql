-- AlterTable
CREATE SEQUENCE "likes_id_seq";
ALTER TABLE "likes" ALTER COLUMN "id" SET DEFAULT nextval('likes_id_seq');
ALTER SEQUENCE "likes_id_seq" OWNED BY "likes"."id";
