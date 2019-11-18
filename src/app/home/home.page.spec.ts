import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HomePage } from './home.page';
import { Howl } from 'howler';

describe('HomePage', () => {
  const INIT_PROGRESS = 0;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomePage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();
  }));

  it('should create', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });

  /* Тест что на странице 3 элемента */
  it('playlist should have 3 elements', () => {
    const { component } = setup();
    expect(component.playlist.length).toEqual(3);
  });

  it('player && activeTrack should be NULL', () => {
    const { component } = setup();
    expect(component.player).toBeNull();
    expect(component.activeTrack).toBeNull();
  });

  it('progress should be zero', () => {
    const { component } = setup();
    expect(component.progress).toEqual(INIT_PROGRESS);
  });

  it('start to be call', () => {
      const { component } = setup();
      component.start(
          component.playlist[0]
      );
      expect(component.player instanceof Howl).toBeTruthy();
  });

  it('check triggerPlayer call pause', () => {
    const { component } = setup();
    component.player = {
      pause: () => {}
    };
    const playerSpy: jasmine.Spy = spyOn(component.player, 'pause');
    component.togglePlayer(true);
    expect(playerSpy).toHaveBeenCalled();
    expect(component.isPlaying).toBeFalsy();
  });

  it('check triggerPlayer call stop', () => {
    const { component } = setup();
    component.player = {
      play: () => {}
    };
    const playerSpy: jasmine.Spy = spyOn(component.player, 'play');
    component.togglePlayer(false);
    expect(playerSpy).toHaveBeenCalled();
    expect(component.isPlaying).toBeTruthy();
  });

  it('range exist in component', async(() => {
    const { component } = setup();
    expect('range' in component).toBeTruthy();
  }));

  function setup() {
    const fixture = TestBed.createComponent(HomePage);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    return {fixture, component};
  }
});
