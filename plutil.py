import plistlib

plist = plistlib.readPlist('target/love.app/Contents/Info.plist')
plist['CFBundleName'] = 'Haru Project'
plist['CFBundleIdentifier'] = 'com.blustar.haru-project'
plist.pop('UTExportedTypeDeclarations')
plistlib.writePlist(plist, 'target/love.app/Contents/Info.plist')