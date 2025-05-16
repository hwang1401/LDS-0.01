/**
 * 테마 타입 정의
 */
export type Theme = 'light' | 'dark';

/**
 * 현재 테마 상태를 관리하는 클래스
 */
export class ThemeManager {
  private static instance: ThemeManager;
  private currentTheme: Theme = 'light';
  private readonly THEME_STORAGE_KEY = 'lumir-theme';
  private readonly THEME_DATA_ATTRIBUTE = 'data-theme';
  
  private constructor() {
    this.initialize();
  }
  
  /**
   * 싱글톤 인스턴스 반환
   */
  public static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }
  
  /**
   * 초기 테마 설정
   */
  private initialize(): void {
    // 브라우저 환경인지 확인
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      // 저장된 테마 확인
      const savedTheme = localStorage.getItem(this.THEME_STORAGE_KEY) as Theme;
      
      // 시스템 테마 확인
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const systemTheme: Theme = prefersDark ? 'dark' : 'light';
      
      // 테마 설정 우선순위: 저장된 테마 > 시스템 테마
      const initialTheme = savedTheme || systemTheme;
      this.setTheme(initialTheme);
      
      // 시스템 테마 변경 감지
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        // 사용자가 명시적으로 테마를 설정하지 않은 경우에만 시스템 테마 따르기
        if (!localStorage.getItem(this.THEME_STORAGE_KEY)) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }
  
  /**
   * 테마 설정
   */
  public setTheme(theme: Theme): void {
    this.currentTheme = theme;
    
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute(this.THEME_DATA_ATTRIBUTE, theme);
    }
    
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.THEME_STORAGE_KEY, theme);
    }
  }
  
  /**
   * 현재 테마 반환
   */
  public getTheme(): Theme {
    return this.currentTheme;
  }
  
  /**
   * 테마 토글
   */
  public toggleTheme(): void {
    const newTheme: Theme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
  
  /**
   * 사용자 테마 선호도 초기화 (시스템 설정 따르기)
   */
  public resetThemePreference(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.THEME_STORAGE_KEY);
    }
    
    if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark ? 'dark' : 'light');
    } else {
      this.setTheme('light');
    }
  }
}

// 편의를 위한 전역 테마 관리자 인스턴스
export const themeManager = ThemeManager.getInstance();

// 테마 토글 함수
export function toggleTheme(): void {
  themeManager.toggleTheme();
}

// 현재 테마 반환 함수
export function getCurrentTheme(): Theme {
  return themeManager.getTheme();
}

// 테마 설정 함수
export function setTheme(theme: Theme): void {
  themeManager.setTheme(theme);
} 