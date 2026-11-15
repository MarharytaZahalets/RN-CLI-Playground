import { StyleSheet } from 'react-native';

import { Colors } from '../../core/theme/colors';
import { Radius, glassSurface } from '../../core/theme/layout';

const styles = StyleSheet.create({
  brandName: {
    color: Colors.text,
    fontSize: 22,
    letterSpacing: -0.3,
    marginTop: 14,
  },
  brandMark: {
    alignItems: 'center',
    backgroundColor: Colors.elevated,
    borderColor: Colors.glassBorder,
    borderRadius: Radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    height: 72,
    justifyContent: 'center',
    width: 72,
  },
  brandSection: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 12,
  },
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    justifyContent: 'flex-start',
  },
  divider: {
    backgroundColor: Colors.divider,
    flex: 1,
    height: StyleSheet.hairlineWidth,
  },
  dividerLabel: {
    color: Colors.textMuted,
    fontSize: 13,
    marginHorizontal: 12,
  },
  dividerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
    marginTop: 28,
  },
  flex: {
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 8,
    paddingTop: 28,
  },
  footerText: {
    color: Colors.textMuted,
    fontSize: 15,
  },
  formContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 12,
  },
  heading: {
    color: Colors.text,
    fontSize: 28,
    letterSpacing: -0.4,
  },
  headingSection: {
    marginBottom: 24,
  },
  input: {
    color: Colors.text,
    flex: 1,
    fontSize: 16,
    minHeight: 48,
    paddingVertical: 12,
  },
  inputIcon: {
    marginRight: 12,
  },
  inputRow: {
    ...glassSurface,
    alignItems: 'center',
    backgroundColor: Colors.elevated,
    borderRadius: Radius.md,
    flexDirection: 'row',
    marginBottom: 12,
    minHeight: 52,
    paddingHorizontal: 14,
  },
  keyboardView: {
    flex: 1,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    marginTop: 8,
    minHeight: 52,
  },
  primaryButtonText: {
    color: Colors.textLight,
    fontSize: 17,
  },
  signInText: {
    color: Colors.primary,
    fontSize: 15,
  },
  socialButton: {
    ...glassSurface,
    backgroundColor: Colors.elevated,
    borderRadius: Radius.md,
    minHeight: 52,
    paddingHorizontal: 14,
  },
  socialButtonText: {
    color: Colors.text,
    fontSize: 14,
  },
  socialContent: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  socialRow: {
    gap: 12,
  },
  subtitle: {
    color: Colors.textMuted,
    fontSize: 16,
    marginTop: 6,
  },
});

export default styles;
