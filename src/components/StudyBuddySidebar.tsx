import { BookOpen, Brain, Code, Trophy, History } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const topics = [
  { title: "Arrays & Strings", icon: Code, count: 5 },
  { title: "Linked Lists", icon: BookOpen, count: 3 },
  { title: "Stacks & Queues", icon: Brain, count: 4 },
  { title: "Trees & Graphs", icon: Trophy, count: 7 },
  { title: "Dynamic Programming", icon: History, count: 6 },
];

const recentChats = [
  { title: "Big O Notation Explained", time: "2 hours ago" },
  { title: "Binary Search Implementation", time: "1 day ago" },
  { title: "Graph Traversal Algorithms", time: "2 days ago" },
];

export function StudyBuddySidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent className="p-4 space-y-4">
        {!isCollapsed && (
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-2">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h2 className="font-semibold text-foreground">Study Buddy</h2>
            <p className="text-xs text-muted-foreground">Your DSA Learning Assistant</p>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>DSA Topics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {topics.map((topic) => (
                <SidebarMenuItem key={topic.title}>
                  <SidebarMenuButton className="hover:bg-muted/50">
                    <topic.icon className="mr-2 h-4 w-4" />
                    {!isCollapsed && (
                      <>
                        <span className="flex-1">{topic.title}</span>
                        <Badge variant="secondary" className="text-xs">
                          {topic.count}
                        </Badge>
                      </>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!isCollapsed && (
          <SidebarGroup>
            <SidebarGroupLabel>Recent Chats</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-2">
                {recentChats.map((chat, index) => (
                  <Card key={index} className="p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                    <p className="text-sm font-medium text-foreground mb-1">
                      {chat.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{chat.time}</p>
                  </Card>
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {!isCollapsed && (
          <Card className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <div className="text-center">
              <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-sm mb-1">Study Streak</h3>
              <p className="text-xs text-muted-foreground mb-2">7 days strong! 🔥</p>
              <div className="text-2xl font-bold text-primary">127</div>
              <p className="text-xs text-muted-foreground">questions solved</p>
            </div>
          </Card>
        )}
      </SidebarContent>
    </Sidebar>
  );
}