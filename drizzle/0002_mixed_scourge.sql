CREATE TABLE "url_analytics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"url_id" uuid NOT NULL,
	"visited_at" timestamp DEFAULT now() NOT NULL,
	"user_agent" text,
	"referrer" text,
	"ip_address" text,
	"country" text,
	"city" text,
	"device" text,
	"browser" text,
	"os" text
);
--> statement-breakpoint
ALTER TABLE "url_analytics" ADD CONSTRAINT "url_analytics_url_id_url_id_fk" FOREIGN KEY ("url_id") REFERENCES "public"."url"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "url_analytics_url_id_idx" ON "url_analytics" USING btree ("url_id");--> statement-breakpoint
CREATE INDEX "url_analytics_visited_at_idx" ON "url_analytics" USING btree ("visited_at");--> statement-breakpoint
CREATE INDEX "url_short_code_idx" ON "url" USING btree ("short_code");--> statement-breakpoint
CREATE INDEX "url_is_active_idx" ON "url" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "url_expires_at_idx" ON "url" USING btree ("expires_at");