
import React from "react";
import { useSavedItems, UserActivity, ActivityType } from "../contexts/SavedItemsContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bookmark, Eye, MessageSquare, ThumbsUp } from "lucide-react";

const RecentActivity = () => {
  const { userActivities } = useSavedItems();
  
  // Get the 5 most recent activities
  const recentActivities = userActivities.slice(0, 5);
  
  if (recentActivities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your recent interactions will appear here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 typography-body-large text-neutral-4">
            No activity yet. Start interacting with content!
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest interactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map(activity => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const ActivityItem = ({ activity }: { activity: UserActivity }) => {
  const activityIcon = getActivityIcon(activity.type);
  const activityLabel = getActivityLabel(activity.type);
  const timeAgo = getTimeAgo(new Date(activity.timestamp));
  const itemTypeLabel = getItemTypeLabel(activity.itemType);
  
  return (
    <div className="flex items-start gap-3 p-2 rounded-md hover:bg-gray-50">
      <div className={`rounded-full p-2 ${getActivityColor(activity.type)}`}>
        {activityIcon}
      </div>
      <div className="flex-1">
        <p className="typography-caption">
          You {activityLabel} {itemTypeLabel}: <span className="typography-caption">{activity.itemTitle}</span>
        </p>
        <p className="typography-caption-small text-neutral-4 mt-1">{timeAgo}</p>
      </div>
    </div>
  );
};

const getActivityIcon = (type: ActivityType) => {
  switch (type) {
    case 'save':
      return <Bookmark size={16} className="text-white" />;
    case 'unsave':
      return <Bookmark size={16} className="text-white" />;
    case 'view':
      return <Eye size={16} className="text-white" />;
    case 'comment':
      return <MessageSquare size={16} className="text-white" />;
    case 'like':
      return <ThumbsUp size={16} className="text-white" />;
  }
};

const getActivityLabel = (type: ActivityType) => {
  switch (type) {
    case 'save':
      return 'saved';
    case 'unsave':
      return 'removed';
    case 'view':
      return 'viewed';
    case 'comment':
      return 'commented on';
    case 'like':
      return 'liked';
  }
};

const getActivityColor = (type: ActivityType) => {
  switch (type) {
    case 'save':
      return 'bg-motortrend-red';
    case 'unsave':
      return 'bg-gray-500';
    case 'view':
      return 'bg-blue-500';
    case 'comment':
      return 'bg-purple-500';
    case 'like':
      return 'bg-green-500';
  }
};

const getItemTypeLabel = (type: string) => {
  switch (type) {
    case 'article':
      return 'an article';
    case 'newCar':
      return 'a new car';
    case 'usedCar':
      return 'a used car';
    case 'photo':
      return 'a photo';
    case 'video':
      return 'a video';
    default:
      return 'an item';
  }
};

const getTimeAgo = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
};

export default RecentActivity;
