# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.16

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:


#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:


# Remove some rules from gmake that .SUFFIXES does not remove.
SUFFIXES =

.SUFFIXES: .hpux_make_needs_suffix_list


# Suppress display of executed commands.
$(VERBOSE).SILENT:


# A target that is always out of date.
cmake_force:

.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/bin/cmake

# The command to remove a file.
RM = /usr/bin/cmake -E remove -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/xy/Network-Framework

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/xy/Network-Framework/build

# Include any dependencies generated for this target.
include xrtcserver/CMakeFiles/xrtcserver.dir/depend.make

# Include the progress variables for this target.
include xrtcserver/CMakeFiles/xrtcserver.dir/progress.make

# Include the compile flags for this target's objects.
include xrtcserver/CMakeFiles/xrtcserver.dir/flags.make

xrtcserver/CMakeFiles/xrtcserver.dir/src/base/conf.cpp.o: xrtcserver/CMakeFiles/xrtcserver.dir/flags.make
xrtcserver/CMakeFiles/xrtcserver.dir/src/base/conf.cpp.o: ../xrtcserver/src/base/conf.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/xy/Network-Framework/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object xrtcserver/CMakeFiles/xrtcserver.dir/src/base/conf.cpp.o"
	cd /home/xy/Network-Framework/build/xrtcserver && /usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles/xrtcserver.dir/src/base/conf.cpp.o -c /home/xy/Network-Framework/xrtcserver/src/base/conf.cpp

xrtcserver/CMakeFiles/xrtcserver.dir/src/base/conf.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/xrtcserver.dir/src/base/conf.cpp.i"
	cd /home/xy/Network-Framework/build/xrtcserver && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/xy/Network-Framework/xrtcserver/src/base/conf.cpp > CMakeFiles/xrtcserver.dir/src/base/conf.cpp.i

xrtcserver/CMakeFiles/xrtcserver.dir/src/base/conf.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/xrtcserver.dir/src/base/conf.cpp.s"
	cd /home/xy/Network-Framework/build/xrtcserver && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/xy/Network-Framework/xrtcserver/src/base/conf.cpp -o CMakeFiles/xrtcserver.dir/src/base/conf.cpp.s

xrtcserver/CMakeFiles/xrtcserver.dir/src/base/log.cpp.o: xrtcserver/CMakeFiles/xrtcserver.dir/flags.make
xrtcserver/CMakeFiles/xrtcserver.dir/src/base/log.cpp.o: ../xrtcserver/src/base/log.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/xy/Network-Framework/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Building CXX object xrtcserver/CMakeFiles/xrtcserver.dir/src/base/log.cpp.o"
	cd /home/xy/Network-Framework/build/xrtcserver && /usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles/xrtcserver.dir/src/base/log.cpp.o -c /home/xy/Network-Framework/xrtcserver/src/base/log.cpp

xrtcserver/CMakeFiles/xrtcserver.dir/src/base/log.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/xrtcserver.dir/src/base/log.cpp.i"
	cd /home/xy/Network-Framework/build/xrtcserver && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/xy/Network-Framework/xrtcserver/src/base/log.cpp > CMakeFiles/xrtcserver.dir/src/base/log.cpp.i

xrtcserver/CMakeFiles/xrtcserver.dir/src/base/log.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/xrtcserver.dir/src/base/log.cpp.s"
	cd /home/xy/Network-Framework/build/xrtcserver && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/xy/Network-Framework/xrtcserver/src/base/log.cpp -o CMakeFiles/xrtcserver.dir/src/base/log.cpp.s

xrtcserver/CMakeFiles/xrtcserver.dir/main.cpp.o: xrtcserver/CMakeFiles/xrtcserver.dir/flags.make
xrtcserver/CMakeFiles/xrtcserver.dir/main.cpp.o: ../xrtcserver/main.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/xy/Network-Framework/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_3) "Building CXX object xrtcserver/CMakeFiles/xrtcserver.dir/main.cpp.o"
	cd /home/xy/Network-Framework/build/xrtcserver && /usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles/xrtcserver.dir/main.cpp.o -c /home/xy/Network-Framework/xrtcserver/main.cpp

xrtcserver/CMakeFiles/xrtcserver.dir/main.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/xrtcserver.dir/main.cpp.i"
	cd /home/xy/Network-Framework/build/xrtcserver && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/xy/Network-Framework/xrtcserver/main.cpp > CMakeFiles/xrtcserver.dir/main.cpp.i

xrtcserver/CMakeFiles/xrtcserver.dir/main.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/xrtcserver.dir/main.cpp.s"
	cd /home/xy/Network-Framework/build/xrtcserver && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/xy/Network-Framework/xrtcserver/main.cpp -o CMakeFiles/xrtcserver.dir/main.cpp.s

# Object files for target xrtcserver
xrtcserver_OBJECTS = \
"CMakeFiles/xrtcserver.dir/src/base/conf.cpp.o" \
"CMakeFiles/xrtcserver.dir/src/base/log.cpp.o" \
"CMakeFiles/xrtcserver.dir/main.cpp.o"

# External object files for target xrtcserver
xrtcserver_EXTERNAL_OBJECTS =

xrtcserver/bin/xrtcserver: xrtcserver/CMakeFiles/xrtcserver.dir/src/base/conf.cpp.o
xrtcserver/bin/xrtcserver: xrtcserver/CMakeFiles/xrtcserver.dir/src/base/log.cpp.o
xrtcserver/bin/xrtcserver: xrtcserver/CMakeFiles/xrtcserver.dir/main.cpp.o
xrtcserver/bin/xrtcserver: xrtcserver/CMakeFiles/xrtcserver.dir/build.make
xrtcserver/bin/xrtcserver: xrtcserver/CMakeFiles/xrtcserver.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/xy/Network-Framework/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_4) "Linking CXX executable bin/xrtcserver"
	cd /home/xy/Network-Framework/build/xrtcserver && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/xrtcserver.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
xrtcserver/CMakeFiles/xrtcserver.dir/build: xrtcserver/bin/xrtcserver

.PHONY : xrtcserver/CMakeFiles/xrtcserver.dir/build

xrtcserver/CMakeFiles/xrtcserver.dir/clean:
	cd /home/xy/Network-Framework/build/xrtcserver && $(CMAKE_COMMAND) -P CMakeFiles/xrtcserver.dir/cmake_clean.cmake
.PHONY : xrtcserver/CMakeFiles/xrtcserver.dir/clean

xrtcserver/CMakeFiles/xrtcserver.dir/depend:
	cd /home/xy/Network-Framework/build && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/xy/Network-Framework /home/xy/Network-Framework/xrtcserver /home/xy/Network-Framework/build /home/xy/Network-Framework/build/xrtcserver /home/xy/Network-Framework/build/xrtcserver/CMakeFiles/xrtcserver.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : xrtcserver/CMakeFiles/xrtcserver.dir/depend
