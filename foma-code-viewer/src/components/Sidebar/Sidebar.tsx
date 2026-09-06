import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { Lesson } from '../../types/lesson';
import './Sidebar.css';

interface SidebarProps {
  lessons: readonly Lesson[];
  currentIndex: number;
  collapsed: boolean;
  onSelectLesson: (id: number) => void;
  width?: number;
  isResizing?: boolean;
}

export function Sidebar({
  lessons,
  currentIndex,
  collapsed,
  onSelectLesson,
  width,
  isResizing,
}: SidebarProps) {
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (discipline: string) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [discipline]: !prev[discipline]
    }));
  };

  const groupedLessons = lessons.reduce((acc, lesson) => {
    const discipline = lesson.discipline || 'Без раздела';
    if (!acc[discipline]) acc[discipline] = [];
    acc[discipline].push(lesson);
    return acc;
  }, {} as Record<string, Lesson[]>);

  return (
    <aside
      className={`sidebar ${collapsed ? 'collapsed' : ''} ${isResizing ? 'resizing' : ''}`}
      style={!collapsed && width ? { width: `${width}px`, minWidth: `${width}px` } : undefined}
      id="sidebar"
    >
      <div className="sidebar-header">
        <div className="sidebar-header-title">Курс</div>
      </div>
      <nav className="sidebar-lessons" aria-label="Lessons">
        {Object.entries(groupedLessons).map(([discipline, groupLessons]) => {
          const isGroupCollapsed = collapsedGroups[discipline];
          return (
            <div key={discipline} className={`sidebar-discipline-group ${isGroupCollapsed ? 'collapsed' : ''}`}>
              {discipline !== 'Без раздела' && (
                <div 
                  className="sidebar-discipline-title clickable" 
                  onClick={() => toggleGroup(discipline)}
                >
                  {isGroupCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                  <span>{discipline}</span>
                </div>
              )}
              {!isGroupCollapsed && groupLessons.map((lesson) => (
                <button
                  key={lesson.id}
                  className={`lesson-item ${lesson.id === currentIndex ? 'active' : ''}`}
                  onClick={() => onSelectLesson(lesson.id)}
                  title={lesson.title}
                  id={`lesson-nav-${lesson.id}`}
                >
                  <span className="lesson-number">{lesson.id}</span>
                  <span className="lesson-title">{lesson.title}</span>
                </button>
              ))}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
